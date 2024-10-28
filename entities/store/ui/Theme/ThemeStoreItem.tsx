'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import type { ThemeProfileAndStore } from '../../model';
import { Added, Check, DotsHorizontal, ResCoin, ResezPremium, ResezPremiumPlus, Trophy } from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';

import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { ConfirmModal } from '@/shared/ui/Modal';

type Props = {
    data: ThemeProfileAndStore;
    addProductToProfile?: () => void;
};

const ThemeStoreItem: React.FC<Props> = ({ data, addProductToProfile = () => {} }) => {
    const {
        title,
        light,
        primary,
        price,
        isCollected,
        requiredAchievement,
        requiredSubscription,
        seasonEndDate,
        seasonStartDate,
        isFree,
    } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmBuyModal, setConfirmBuyModal] = React.useState(false);

    return (
        <>
            <div className={cn(base.item3, styles.avatarItem)}>
                <div className={styles.avatarItemContent} style={{ background: light }}>
                    {isCollected && (
                        <div className={styles.avatarItemCollected}>
                            <Check />
                        </div>
                    )}

                    <div style={{ background: primary, width: '100px', height: '100px', borderRadius: '50%' }}></div>
                </div>

                <div className={styles.avatarItemTags}>
                    {requiredSubscription && (
                        <Tooltip title={`Для покупки требуется подписка ${requiredSubscription.subscription}`}>
                            <span className={styles.avatarItemTag}>
                                {requiredSubscription.subscription === 'ResEz Premium' ? (
                                    <ResezPremium />
                                ) : (
                                    <ResezPremiumPlus />
                                )}
                            </span>
                        </Tooltip>
                    )}

                    {requiredAchievement && (
                        <Tooltip title={`Для покупки требуется достижение "${requiredAchievement.achievement}"`}>
                            <span className={styles.avatarItemTag}>
                                <Trophy />
                            </span>
                        </Tooltip>
                    )}

                    {(seasonStartDate || seasonEndDate) && (
                        <Tooltip
                            title={`Доступна к покупке с ${formatDate(seasonStartDate, 'D.MM')} до ${formatDate(
                                seasonEndDate,
                                'D.MM',
                            )}`}
                        >
                            <span className={styles.avatarItemTagText}>
                                {formatDate(seasonStartDate, 'D.MM')} - {formatDate(seasonEndDate, 'D.MM')}
                            </span>
                        </Tooltip>
                    )}
                </div>

                <Text variant="h4" fontWeight={600}>
                    {title}
                </Text>

                <div className={styles.avatarItemBottom}>
                    {isFree ? (
                        <Text fontWeight={600}>Бесплатно</Text>
                    ) : (
                        <div className={styles.avatarItemPrice}>
                            {price}

                            <ResCoin />
                        </div>
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
                        ) : !isFree ? (
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
