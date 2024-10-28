'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import {
    Cross,
    Date,
    Delete,
    DotsHorizontal,
    Edit,
    Heart,
    Lock,
    Photo,
    Settings,
    Share,
    TypesCards,
    TypesLearn,
    TypesSelection,
    TypesTest,
} from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useCollections } from '@/features/collection';
import CollectionSettings from './CollectionSettings';
import { Copy } from '@/shared/icons/Copy';
import { useDebounce } from '@/shared/hooks/useDebounce';
import useShortInfo from '@/features/user/data/useShortInfo';
import { CollectionPairItem } from '@/entities/collection/ui';

import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { SearchInput } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { NotContent } from '@/shared/ui/NotContent';
import { CatalogItemSkeleton } from '@/shared/ui/Skeleton';

const MemoryCardInfo = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const [actionMenu, setActionMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);
    const [showAnswers, setShowAnswers] = React.useState(false);
    const [settingsModal, setSettingsModal] = React.useState(false);

    const [search, setSearch] = React.useState('');

    const searchValue = useDebounce(search, 500);

    const { id } = useParams();
    const { getCollectionById, deleteCollectionById, likeCollection, getPairsCollectionById } = useCollections();
    const { getShortInfo } = useShortInfo();
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['collection_by_id', id],
        queryFn: () => getCollectionById(String(id), () => router.push('/training/memory')),
        enabled: !!id,
    });

    const { data: userInfo, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { id: userId } = userInfo?.user || {};

    const {
        data: collectionPairs,
        isPending: collectionPairsIsLoading,
        isError: collectionPairsError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['pairs_collection_by_id', id, searchValue],
        queryFn: (param) => getPairsCollectionById(param.pageParam, String(id), searchValue),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!id,
    });

    const queryClient = useQueryClient();

    const revalidateCollection = async () => {
        await queryClient.invalidateQueries({ queryKey: ['collection_by_id'] });
    };

    const {
        collection: collectionName,
        isPrivate,
        pairsCount,
        description,
        user,
        createdAt,
        likesCount,
        isLiked,
        hasPictures,
    } = data || {};
    const { id: authorId, avatar, nickname } = user || {};

    const deleteCollectionHandler = () => {
        deleteCollectionById(String(id), () => router.push('/training/memory'));
    };

    const likeCollectionHandler = () => {
        if (!isAuth) {
            return router.push('/login');
        }

        likeCollection(String(id), revalidateCollection);
    };

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            {isError ? (
                <NotContent text="Ошибка при загрузке коллекции" icon={<Cross />} danger />
            ) : (
                <>
                    <div className={styles.memoCollectionTitleInner}>
                        <BackButton />

                        <div className={styles.memoCollectionTags}>
                            <div className={base.tagElement}>Терминов: {pairsCount || 0}</div>

                            {isPrivate && (
                                <Tooltip title="Скрыта">
                                    <div className={base.tagElementIcon}>
                                        <Lock />
                                    </div>
                                </Tooltip>
                            )}

                            {hasPictures && (
                                <Tooltip title="Есть картинки">
                                    <div className={base.tagElementIcon}>
                                        <Photo />
                                    </div>
                                </Tooltip>
                            )}
                        </div>

                        <div className={styles.memoCollectionActions}>
                            <Button
                                small
                                variant="light"
                                color="danger"
                                className={cn(styles.memoCollectionActionLike, {
                                    [styles.active]: isLiked,
                                })}
                                onClick={likeCollectionHandler}
                            >
                                <Heart />

                                {likesCount}
                            </Button>

                            <HoverMenu
                                value={actionMenu}
                                setValue={setActionMenu}
                                button={
                                    <IconButton variant="light" small onClick={() => setActionMenu((prev) => !prev)}>
                                        <DotsHorizontal />
                                    </IconButton>
                                }
                            >
                                <MenuLink
                                    onClick={() => {
                                        setSettingsModal(true);
                                        setActionMenu(false);
                                    }}
                                >
                                    <Settings />
                                    Настройки
                                </MenuLink>

                                {userId === authorId && (
                                    <>
                                        <MenuLink href={`/training/memory/edit/${id}`}>
                                            <Edit />
                                            Редактировать
                                        </MenuLink>

                                        <MenuLink
                                            danger
                                            onClick={() => {
                                                setDeleteCollectionModal(true);
                                                setActionMenu(false);
                                            }}
                                        >
                                            <Delete />
                                            Удалить
                                        </MenuLink>
                                    </>
                                )}

                                {/* <MenuLink
                                    onClick={() => {
                                        setActionMenu(false);
                                    }}
                                    disabled
                                >
                                    <Share />
                                    Поделиться
                                </MenuLink>

                                <MenuLink
                                    onClick={() => {
                                        setActionMenu(false);
                                    }}
                                    disabled
                                >
                                    <Copy />
                                    Дублировать
                                </MenuLink> */}
                            </HoverMenu>
                        </div>
                    </div>

                    <div className={styles.memoCollectionTextInner}>
                        {collectionName && <Text variant="h3">{collectionName}</Text>}

                        {description && <Text>{description}</Text>}
                    </div>

                    <div className={base.titleInner}>
                        <Link prefetch={false} href={`/user/${nickname}`} className={base.titleWrapper}>
                            <Badge image={avatar} text={nickname} isUserAvatar />

                            <Text>{nickname}</Text>
                        </Link>

                        {createdAt && (
                            <Tooltip title="Дата создания">
                                <div className={styles.memoCollectionDateInner}>
                                    <Date />

                                    {formatDate(createdAt, 'D MMMM YYYY')}
                                </div>
                            </Tooltip>
                        )}
                    </div>

                    <div className={cn(base.contentItems, styles.memoCollectionTypes)}>
                        <LinkBlock title="Карточки" href={`/memory/${id}/cards`} className={base.item4}>
                            <TypesCards />
                        </LinkBlock>

                        <LinkBlock title="Тест" href={`/memory/${id}/test`} className={base.item4}>
                            <TypesTest />
                        </LinkBlock>

                        <LinkBlock title="Подбор" href={`/memory/${id}/selection`} className={base.item4}>
                            <TypesSelection />
                        </LinkBlock>

                        <LinkBlock title="Заучивание" href={`/memory/${id}/learn`} disabled className={base.item4}>
                            <TypesLearn />
                        </LinkBlock>
                    </div>

                    <div className={cn(base.contentItems, styles.memoCollectionPairsInner)}>
                        <div className={base.titleInner}>
                            <Text variant="h4">Термины ({pairsCount || 0})</Text>

                            <button
                                className={styles.memoCollectionsShowAnswers}
                                onClick={() => setShowAnswers((prev) => !prev)}
                            >
                                {showAnswers ? 'Скрыть ответы' : 'Показать ответы'}
                            </button>
                        </div>

                        <SearchInput value={search} setValue={setSearch} />

                        <div className={base.contentItems}>
                            {collectionPairsIsLoading ? (
                                <div className={base.contentItems}>
                                    {[...Array(4)].map((_, id) => (
                                        <CatalogItemSkeleton key={id} />
                                    ))}
                                </div>
                            ) : collectionPairsError ? (
                                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                            ) : collectionPairs?.pages[0]?.totalCount ? (
                                <div className={base.contentItems}>
                                    {collectionPairs?.pages.map((pair) =>
                                        pair?.cards?.map((data) => (
                                            <CollectionPairItem key={data.id} data={data} showAnswers={showAnswers} />
                                        )),
                                    )}
                                </div>
                            ) : (
                                <NotContent text="Терминов не найдено" />
                            )}

                            {!collectionPairsError && hasNextPage && (
                                <Button
                                    auto
                                    onClick={fetchNextPage}
                                    loading={isFetchingNextPage}
                                    className={base.buttonShowMore}
                                >
                                    Показать еще
                                </Button>
                            )}
                        </div>
                    </div>

                    <ConfirmModal
                        value={deleteCollectionModal}
                        setValue={setDeleteCollectionModal}
                        text="Вы действительно хотите удалить коллекцию?"
                        confirmText="Удалить"
                        callback={deleteCollectionHandler}
                    />

                    <CollectionSettings id={String(id)} openModal={settingsModal} setOpenModal={setSettingsModal} />
                </>
            )}
        </div>
    );
};

export default MemoryCardInfo;
