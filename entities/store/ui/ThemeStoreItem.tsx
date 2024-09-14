'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { Theme } from '../model';
import { Added, Archive, Check, DotsHorizontal, Edit, Notebook, ResCoin, Store } from '@/shared/icons';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: Theme;
    addProductToProfile?: () => void;
};

const ThemeStoreItem: React.FC<Props> = ({ data, addProductToProfile = () => {} }) => {
    const { title, light, primary, isPublished, price, isCollected } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmBuyModal, setConfirmBuyModal] = React.useState(false);

    return (
        <>
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

                <div className={styles.avatarItemContent} style={{ background: light }}>
                    <div style={{ background: primary, width: '100px', height: '100px', borderRadius: '50%' }}></div>
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
                        {isCollected ? (
                            <MenuLink disabled>
                                <Check />
                                Добавлено
                            </MenuLink>
                        ) : price ? (
                            <MenuLink
                                onClick={() => {
                                    setActionMenu(false);
                                    setConfirmBuyModal(true);
                                }}
                            >
                                <Added />
                                Купить
                            </MenuLink>
                        ) : (
                            <MenuLink onClick={addProductToProfile}>
                                <Added />
                                Добавить
                            </MenuLink>
                        )}
                    </HoverMenu>
                </div>
            </div>

            {!!price && (
                <ConfirmModal
                    text={`Вы действительно хотите купить ${title} за ${price} ResCoin?`}
                    value={confirmBuyModal}
                    setValue={setConfirmBuyModal}
                    callback={addProductToProfile}
                />
            )}
        </>
    );
};

export default ThemeStoreItem;
