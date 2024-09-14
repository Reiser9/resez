'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import type { AvatarDecoration as AvatarDecorationType } from '../model';
import useShortInfo from '@/features/user/data/useShortInfo';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Added, Check, Clapperboard, DotsHorizontal, Photo, ResCoin } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';

type Props = {
    data: AvatarDecorationType;
    addProductToProfile: () => void;
};

const AvatarStoreItem: React.FC<Props> = ({ data, addProductToProfile }) => {
    const { title, contentType, options, contentUrl, isCollected, price } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmBuyModal, setConfirmBuyModal] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { avatar, nickname } = user?.user || {};

    return (
        <>
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
                </div>

                <div className={styles.avatarItemContent}>
                    {isCollected && (
                        <div className={styles.avatarItemCollected}>
                            <Check />
                        </div>
                    )}

                    <Badge image={avatar} text={nickname || 'R'} style={{ width: 92, height: 92 }} />

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

export default AvatarStoreItem;
