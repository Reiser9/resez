'use client';

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { Theme } from '../model';
import { Added, Check, DotsHorizontal, ResCoin } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';

type Props = {
    data: Theme;
    useProduct?: () => void;
};

const ThemeProfileItem: React.FC<Props> = ({ data, useProduct = () => {} }) => {
    const { title, light, primary, isActive, price } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);

    return (
        <div
            className={cn(base.item3, styles.avatarItem, {
                [styles.active]: isActive,
            })}
        >
            <div className={styles.avatarItemContent} style={{ background: light }}>
                <div style={{ background: primary, width: '100px', height: '100px', borderRadius: '50%' }}></div>
            </div>

            <div className={styles.avatarItemBottom}>
                {/* {price ? (
                    <div className={styles.avatarItemPrice}>
                        {price}

                        <ResCoin />
                    </div>
                ) : (
                    <Text fontWeight={600}>Бесплатно</Text>
                )} */}

                <Text variant="h4" fontWeight={600}>
                    {title}
                </Text>

                <HoverMenu
                    button={
                        <IconButton small variant="light" onClick={() => setActionMenu((prev) => !prev)}>
                            <DotsHorizontal />
                        </IconButton>
                    }
                    value={actionMenu}
                    setValue={setActionMenu}
                >
                    {isActive ? (
                        <MenuLink disabled>
                            <Check />
                            Используется
                        </MenuLink>
                    ) : (
                        <MenuLink onClick={useProduct}>
                            <Added />
                            Использовать
                        </MenuLink>
                    )}
                </HoverMenu>
            </div>
        </div>
    );
};

export default ThemeProfileItem;
