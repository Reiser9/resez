'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { AvatarDecoration as AvatarDecorationType } from '../model';
import { Archive, Clapperboard, DotsHorizontal, Edit, Notebook, Photo, ResCoin, Store } from '@/shared/icons';
import useShortInfo from '@/features/user/data/useShortInfo';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';

type Props = {
    data: AvatarDecorationType;
    edit?: boolean;
    publish?: boolean;
    remove?: boolean;
    togglePublish?: () => void;
};

const AvatarItem: React.FC<Props> = ({ data, edit, publish, remove, togglePublish = () => {} }) => {
    const { title, contentType, options, contentUrl, isPublished, price } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);

    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { avatar, nickname } = user?.user || {};

    return (
        <div className={cn(base.item3, styles.avatarItem)}>
            <div className={styles.avatarItemTags}>
                {contentType === 'animation' ? (
                    <Tooltip title="Анимация">
                        <span className={styles.avatarItemTag}>
                            <Clapperboard />
                        </span>
                    </Tooltip>
                ) : (
                    <Tooltip title="Изображение">
                        <span className={styles.avatarItemTag}>
                            <Photo />
                        </span>
                    </Tooltip>
                )}

                {isPublished ? (
                    <Tooltip title="В магазине">
                        <span className={styles.avatarItemTag}>
                            <Store />
                        </span>
                    </Tooltip>
                ) : (
                    <Tooltip title="В черновике">
                        <span className={styles.avatarItemTag}>
                            <Notebook />
                        </span>
                    </Tooltip>
                )}
            </div>

            <div className={styles.avatarItemContent}>
                <Badge image={avatar} text={nickname} style={{ width: 92, height: 92 }} />

                <AvatarDecoration
                    title={title}
                    contentUrl={contentUrl}
                    contentType={contentType}
                    options={options}
                    hoverAnimation
                />
            </div>

            <Text variant="h4" fontWeight={600}>
                {title}
            </Text>

            <div className={styles.avatarItemBottom}>
                {price ? (
                    <div className={styles.avatarItemPrice}>
                        {price}

                        <ResCoin />
                    </div>
                ) : (
                    <Text fontWeight={600}>Бесплатно</Text>
                )}

                <HoverMenu
                    button={
                        <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                            <DotsHorizontal />
                        </IconButton>
                    }
                    value={actionMenu}
                    setValue={setActionMenu}
                >
                    {publish && isPublished ? (
                        <MenuLink onClick={togglePublish}>
                            <Notebook />В черновик
                        </MenuLink>
                    ) : (
                        <MenuLink onClick={togglePublish}>
                            <Store />
                            Опубликовать
                        </MenuLink>
                    )}

                    {edit && (
                        <MenuLink>
                            <Edit />
                            Редактировать
                        </MenuLink>
                    )}

                    {remove && (
                        <MenuLink danger>
                            <Archive />В архив
                        </MenuLink>
                    )}
                </HoverMenu>
            </div>
        </div>
    );
};

export default AvatarItem;
