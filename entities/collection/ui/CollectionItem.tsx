'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { Collection } from '@/entities/collection';
import { ArrowRightLong, Delete, DotsHorizontal, Edit, Heart, Lock, Photo } from '@/shared/icons';
import useShortInfo from '@/features/user/data/useShortInfo';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Badge } from '@/shared/ui/Badge';
import { LoaderForItem } from '@/shared/ui/Preloader';
import { IconButton } from '@/shared/ui/Button';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';

type Props = {
    data: Collection;
    loading?: boolean;
    deleteCallback?: () => void;
};

const CollectionItem: React.FC<Props> = ({ data, loading = false, deleteCallback }) => {
    const { id, collection, description, isPrivate, pairsCount, user, likesCount, isLiked, hasPictures } = data || {};
    const { avatar, nickname, id: authorId } = user || {};

    const [collectionItemMenu, setCollectionItemMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getShortInfo } = useShortInfo();

    const { data: userInfo, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { id: currentUserId } = userInfo?.user || {};

    return (
        <div className={cn(base.item3, styles.collectionItem)}>
            <Link prefetch={false} href={`/training/memory/${id}`} className={styles.collectionItemInfoInner}>
                <span className={styles.collectionItemInfo}>
                    <p className={styles.collectionItemName}>{collection}</p>

                    <span className={styles.collectionItemTags}>
                        <p className={styles.collectionItemNumber}>Терминов: {pairsCount}</p>

                        <p
                            className={cn(styles.collectionItemLikes, {
                                [styles.isLiked]: isLiked,
                            })}
                        >
                            <Heart />

                            {likesCount}
                        </p>

                        {isPrivate && (
                            <Tooltip title="Скрыта">
                                <span className={styles.collectionItemLock}>
                                    <Lock />
                                </span>
                            </Tooltip>
                        )}

                        {hasPictures && (
                            <Tooltip title="Есть картинки">
                                <span className={styles.collectionItemImage}>
                                    <Photo />
                                </span>
                            </Tooltip>
                        )}
                    </span>
                </span>

                <span className={styles.collectionItemLink}>
                    <ArrowRightLong />
                </span>
            </Link>

            {description && (
                <Text variant="text2" className={styles.collectionItemDescription}>
                    {description}
                </Text>
            )}

            <div className={styles.collectionItemBottom}>
                <Link prefetch={false} href={`/user/${nickname}`} className={styles.collectionItemAuthor}>
                    <Badge isUserAvatar image={avatar} text={nickname} />

                    <p className={styles.collectionItemAuthorName}>{nickname}</p>
                </Link>

                {authorId === currentUserId && (
                    <HoverMenu
                        button={
                            <IconButton variant="light" small onClick={() => setCollectionItemMenu(true)}>
                                <DotsHorizontal />
                            </IconButton>
                        }
                        value={collectionItemMenu}
                        setValue={setCollectionItemMenu}
                    >
                        <MenuLink href={`/training/memory/edit/${id}`}>
                            <Edit />
                            Редактировать
                        </MenuLink>

                        {deleteCallback && (
                            <MenuLink
                                danger
                                onClick={() => {
                                    setCollectionItemMenu(false);
                                    setDeleteCollectionModal(true);
                                }}
                            >
                                <Delete />
                                Удалить
                            </MenuLink>
                        )}
                    </HoverMenu>
                )}
            </div>

            {loading && <LoaderForItem />}

            {deleteCallback && authorId === currentUserId && (
                <ConfirmModal
                    text="Вы действительно хотите удалить коллекцию?"
                    confirmText="Удалить"
                    value={deleteCollectionModal}
                    setValue={setDeleteCollectionModal}
                    callback={deleteCallback}
                />
            )}
        </div>
    );
};

export default CollectionItem;
