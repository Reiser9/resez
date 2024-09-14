'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { Theme } from '../model';
import { Archive, DotsHorizontal, Edit, Notebook, ResCoin, Store } from '@/shared/icons';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

type Props = {
    data: Theme;
    edit?: boolean;
    publish?: boolean;
    remove?: boolean;
    togglePublish?: () => void;
};

const ThemeItem: React.FC<Props> = ({ data, edit, publish, remove, togglePublish = () => {} }) => {
    const { title, light, primary, isPublished, price } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);

    return (
        <div className={cn(base.item3, styles.avatarItem)}>
            <div className={styles.avatarItemTags}>
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

            <div className={styles.avatarItemContent} style={{background: light}}>
                <div style={{background: primary, width: "100px", height: "100px", borderRadius: "50%"}}></div>
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

export default ThemeItem;
