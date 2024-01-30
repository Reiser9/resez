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

type Props = {
    data: Collection;
    loading?: boolean;
};

const CollectionItem: React.FC<Props> = ({ data, loading = false }) => {
    const { id, collection, description, isPrivate, pairsCount, user } = data || {};
    const { avatar, nickname } = user || {};

    const [collectionItemMenu, setCollectionItemMenu] = React.useState<boolean>(false);

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
                    <Badge image={avatar} text={nickname} />

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
                    <MenuLink>
                        <Edit />
                        Редактировать
                    </MenuLink>

                    <MenuLink danger>
                        <Delete />
                        Удалить
                    </MenuLink>
                </HoverMenu>
            </div>

            {loading && <LoaderForItem />}
        </div>
    );
};

export default CollectionItem;
