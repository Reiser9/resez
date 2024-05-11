'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { Tooltip } from 'antd';
import Image from 'next/image';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Collection } from '@/entities/collection';
import { ArrowRightLong, Delete, DotsHorizontal, Edit, Lock } from '@/shared/icons';
import { Text } from '../Text';
import { HoverMenu, MenuLink } from '../HoverMenu';
import { IconButton } from '../Button';
import { LoaderForItem } from '../Preloader';
import { Badge } from '../Badge';
import { useRouter } from 'next/navigation';
import { ConfirmModal } from '../Modal';

type Props = {
    data: Collection;
    loading?: boolean;
    deleteCallback?: () => void;
};

const CollectionItem: React.FC<Props> = ({ data, loading = false, deleteCallback = () => {} }) => {
    const { id, collection, description, isPrivate, pairsCount, user } = data || {};
    const { avatar, nickname } = user || {};

    const [collectionItemMenu, setCollectionItemMenu] = React.useState(false);
    const [deleteCollectionModal, setDeleteCollectionModal] = React.useState(false);

    const router = useRouter();

    return (
        <div className={cn(base.item3, styles.collectionItem)}>
            <Link href={`memory/${id}`} className={styles.collectionItemInfoInner}>
                <span className={styles.collectionItemInfo}>
                    <p className={styles.collectionItemName}>{collection}</p>

                    <span className={styles.collectionItemTags}>
                        <p className={styles.collectionItemNumber}>Терминов: {pairsCount}</p>

                        {isPrivate && (
                            <Tooltip title="Скрыта">
                                <span className={styles.collectionItemLock}>
                                    <Lock />
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
                <Link href={`/user/${nickname}`} className={styles.collectionItemAuthor}>
                    <Badge isUserAvatar image={avatar} text={nickname} />

                    <p className={styles.collectionItemAuthorName}>{nickname}</p>
                </Link>

                <HoverMenu
                    button={
                        <IconButton variant="light" small onClick={() => setCollectionItemMenu(true)}>
                            <DotsHorizontal />
                        </IconButton>
                    }
                    value={collectionItemMenu}
                    setValue={setCollectionItemMenu}
                >
                    <MenuLink onClick={() => router.push(`/training/memory/edit/${id}`)}>
                        <Edit />
                        Редактировать
                    </MenuLink>

                    <MenuLink danger onClick={() => {
                        setCollectionItemMenu(false);
                        setDeleteCollectionModal(true);
                    }}>
                        <Delete />
                        Удалить
                    </MenuLink>
                </HoverMenu>
            </div>

            {loading && <LoaderForItem />}

            <ConfirmModal
                text="Вы действительно хотите удалить коллекцию?"
                confirmText="Удалить"
                value={deleteCollectionModal}
                setValue={setDeleteCollectionModal}
                callback={deleteCallback}
            />
        </div>
    );
};

export default CollectionItem;
