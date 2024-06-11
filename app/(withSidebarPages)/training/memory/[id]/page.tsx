<<<<<<< HEAD
'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Preloader } from '@/shared/ui/Preloader';
import { Tooltip } from 'antd';
import {
    Cross,
    Date,
    Delete,
    DotsHorizontal,
    Edit,
    Heart,
    Lock,
    Settings,
    Share,
    TypesCards,
    TypesLearn,
    TypesSelection,
    TypesTest,
} from '@/shared/icons';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { formatDate } from '@/shared/utils/formatDate';
import { TextPoint } from '@/shared/ui/TextPoint';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Badge } from '@/shared/ui/Badge';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { NotContent } from '@/shared/ui/NotContent';
import { useCollections } from '@/features/collection';
import CollectionSettings from './CollectionSettings';
import { Copy } from '@/shared/icons/Copy';

const MemoryCardInfo = () => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);
    const [showAnswers, setShowAnswers] = React.useState(false);
    const [settingsModal, setSettingsModal] = React.useState(false);

    const { id } = useParams();
    const { getCollectionById, deleteCollectionById, getCollectionSettings, updateSettings, likeCollection } = useCollections();
    const userId = useAppSelector((state) => state.user.user?.id);
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ['collection_by_id', id],
        queryFn: () => getCollectionById(String(id), () => router.push('/training/memory')),
        enabled: !!id,
    });

    const queryClient = useQueryClient();

    const revalidateCollection = async () => {
        await queryClient.invalidateQueries({ queryKey: ['collection_by_id'] });
    };

    const {
        collection: collectionName,
        pairs,
        isPrivate,
        pairsCount,
        description,
        user,
        createdAt,
        likesCount,
        isLiked
    } = data || {};
    const { id: authorId, avatar, nickname } = user || {};

    const deleteCollectionHandler = () => {
        deleteCollectionById(String(id), () => router.push('/training/memory'));
    };

    const likeCollectionHandler = () => {
        likeCollection(String(id), revalidateCollection);
    }

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            {error ? (
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
                        </div>

                        <div className={styles.memoCollectionActions}>
                            <Button small variant="light" color="danger" className={cn(styles.memoCollectionActionLike, {
                                [styles.active]: isLiked
                            })} onClick={likeCollectionHandler}>
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
                                        <MenuLink onClick={() => router.push(`/training/memory/edit/${id}`)}>
                                            <Edit />
                                            Редактировать
                                        </MenuLink>

                                        <MenuLink danger onClick={() => setDeleteCollectionModal(true)}>
                                            <Delete />
                                            Удалить
                                        </MenuLink>
                                    </>
                                )}

                                <MenuLink
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
                                </MenuLink>
                            </HoverMenu>
                        </div>
                    </div>

                    <div className={styles.memoCollectionTextInner}>
                        {collectionName && <Text variant="h3">{collectionName}</Text>}

                        {description && <Text>{description}</Text>}
                    </div>

                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <Badge image={avatar} text={nickname} isUserAvatar />

                            <Text>{nickname}</Text>
                        </div>

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
                        <LinkBlock title="Карточки" href={`${id}/cards`} className={base.item4}>
                            <TypesCards />
                        </LinkBlock>

                        <LinkBlock title="Тест" href={`${id}/test`} className={base.item4}>
                            <TypesTest />
                        </LinkBlock>

                        <LinkBlock title="Заучивание" href={`${id}/learn`} disabled className={base.item4}>
                            <TypesLearn />
                        </LinkBlock>

                        <LinkBlock title="Подбор" href={`${id}/selection`} disabled className={base.item4}>
                            <TypesSelection />
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

                        <div className={base.contentItems}>
                            {pairs?.map((data) => (
                                <div key={data.id} className={cn(base.item2, styles.memoCollectionPair)}>
                                    <TextPoint title="Термин">
                                        {data.questionPicture && (
                                            <div className={styles.memoCollectionPairImage}>
                                                <Image src={data.questionPicture} alt="image" fill />
                                            </div>
                                        )}

                                        <Text variant="text2" style={{ marginTop: '0.4rem' }}>
                                            {data.questionText}
                                        </Text>
                                    </TextPoint>

                                    <TextPoint blur={!showAnswers} title="Определение">
                                        {data.answerPicture && (
                                            <div className={styles.memoCollectionPairImage}>
                                                <Image src={data.answerPicture} alt="image" fill />
                                            </div>
                                        )}

                                        <Text variant="text2" style={{ marginTop: '0.4rem' }}>
                                            {data.answerText}
                                        </Text>
                                    </TextPoint>
                                </div>
                            ))}
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
=======
'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Preloader } from '@/shared/ui/Preloader';
import { Tooltip } from 'antd';
import {
    Cross,
    Date,
    Delete,
    DotsHorizontal,
    Edit,
    Heart,
    Lock,
    Settings,
    Share,
    TypesCards,
    TypesLearn,
    TypesSelection,
    TypesTest,
} from '@/shared/icons';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { formatDate } from '@/shared/utils/formatDate';
import { TextPoint } from '@/shared/ui/TextPoint';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Badge } from '@/shared/ui/Badge';
import { LinkBlock } from '@/shared/ui/LinkBlock';
import { NotContent } from '@/shared/ui/NotContent';
import { useCollections } from '@/features/collection';
import CollectionSettings from './CollectionSettings';
import { Copy } from '@/shared/icons/Copy';

const MemoryCardInfo = () => {
    const [actionMenu, setActionMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);
    const [showAnswers, setShowAnswers] = React.useState(false);
    const [settingsModal, setSettingsModal] = React.useState(false);

    const { id } = useParams();
    const { getCollectionById, deleteCollectionById, getCollectionSettings, updateSettings, likeCollection } = useCollections();
    const userId = useAppSelector((state) => state.user.user?.id);
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
        queryKey: ['collection_by_id', id],
        queryFn: () => getCollectionById(String(id), () => router.push('/training/memory')),
        enabled: !!id,
    });

    const queryClient = useQueryClient();

    const revalidateCollection = async () => {
        await queryClient.invalidateQueries({ queryKey: ['collection_by_id'] });
    };

    const {
        collection: collectionName,
        pairs,
        isPrivate,
        pairsCount,
        description,
        user,
        createdAt,
        likesCount,
        isLiked
    } = data || {};
    const { id: authorId, avatar, nickname } = user || {};

    const deleteCollectionHandler = () => {
        deleteCollectionById(String(id), () => router.push('/training/memory'));
    };

    const likeCollectionHandler = () => {
        likeCollection(String(id), revalidateCollection);
    }

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            {error ? (
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
                        </div>

                        <div className={styles.memoCollectionActions}>
                            <Button small variant="light" color="danger" className={cn(styles.memoCollectionActionLike, {
                                [styles.active]: isLiked
                            })} onClick={likeCollectionHandler}>
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
                                        <MenuLink onClick={() => router.push(`/training/memory/edit/${id}`)}>
                                            <Edit />
                                            Редактировать
                                        </MenuLink>

                                        <MenuLink danger onClick={() => setDeleteCollectionModal(true)}>
                                            <Delete />
                                            Удалить
                                        </MenuLink>
                                    </>
                                )}

                                <MenuLink
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
                                </MenuLink>
                            </HoverMenu>
                        </div>
                    </div>

                    <div className={styles.memoCollectionTextInner}>
                        {collectionName && <Text variant="h3">{collectionName}</Text>}

                        {description && <Text>{description}</Text>}
                    </div>

                    <div className={base.titleInner}>
                        <div className={base.titleWrapper}>
                            <Badge image={avatar} text={nickname} isUserAvatar />

                            <Text>{nickname}</Text>
                        </div>

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
                        <LinkBlock title="Карточки" href={`${id}/cards`} className={base.item4}>
                            <TypesCards />
                        </LinkBlock>

                        <LinkBlock title="Тест" href={`${id}/test`} className={base.item4}>
                            <TypesTest />
                        </LinkBlock>

                        <LinkBlock title="Заучивание" href={`${id}/learn`} disabled className={base.item4}>
                            <TypesLearn />
                        </LinkBlock>

                        <LinkBlock title="Подбор" href={`${id}/selection`} disabled className={base.item4}>
                            <TypesSelection />
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

                        <div className={base.contentItems}>
                            {pairs?.map((data) => (
                                <div key={data.id} className={cn(base.item2, styles.memoCollectionPair)}>
                                    <TextPoint title="Термин">
                                        {data.questionPicture && (
                                            <div className={styles.memoCollectionPairImage}>
                                                <Image src={data.questionPicture} alt="image" fill />
                                            </div>
                                        )}

                                        <Text variant="text2" style={{ marginTop: '0.4rem' }}>
                                            {data.questionText}
                                        </Text>
                                    </TextPoint>

                                    <TextPoint blur={!showAnswers} title="Определение">
                                        {data.answerPicture && (
                                            <div className={styles.memoCollectionPairImage}>
                                                <Image src={data.answerPicture} alt="image" fill />
                                            </div>
                                        )}

                                        <Text variant="text2" style={{ marginTop: '0.4rem' }}>
                                            {data.answerText}
                                        </Text>
                                    </TextPoint>
                                </div>
                            ))}
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
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
