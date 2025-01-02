'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import type { AvatarDecorationProfileAndStore as AvatarDecorationType } from '../../model';
import useShortInfo from '@/features/user/data/useShortInfo';
import { useAppSelector } from '@/shared/hooks/useRedux';
import {
    Added,
    Check,
    Clapperboard,
    DotsHorizontal,
    Photo,
    ResCoin,
    ResezPremium,
    ResezPremiumPlus,
    Trophy,
} from '@/shared/icons';
import { formatDate } from '@/shared/utils/formatDate';

import { Text } from '@/shared/ui/Text';
import { Badge } from '@/shared/ui/Badge';
import { HoverMenu, MenuLink } from '@/shared/ui/HoverMenu';
import { IconButton } from '@/shared/ui/Button';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { AvatarDecoration } from '@/shared/ui/AvatarDecoration';

type Props = {
    data: AvatarDecorationType;
    addProductToProfile: () => void;
    openProductModal?: () => void;
};

const AvatarStoreItem: React.FC<Props> = ({ data, addProductToProfile, openProductModal = () => {} }) => {
    const {
        title,
        contentType,
        options,
        contentUrl,
        isCollected,
        price,
        isFree,
        requiredAchievement,
        requiredSubscription,
        seasonStartDate,
        seasonEndDate,
        id,
    } = data || {};

    const [actionMenu, setActionMenu] = React.useState(false);
    const [confirmBuyModal, setConfirmBuyModal] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getShortInfo } = useShortInfo();

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { avatar, nickname } = user?.user || {};

    return (
        <>
            <div className={cn(base.item3, styles.avatarItem)}>
                <div className={styles.avatarItemContent} onClick={openProductModal}>
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

                <div className={styles.avatarItemTags}>
                    {contentType === 'animation' ? (
                        <Tooltip destroyTooltipOnHide title="Анимация">
                            <span className={styles.avatarItemTag}>
                                <Clapperboard />
                            </span>
                        </Tooltip>
                    ) : (
                        <Tooltip destroyTooltipOnHide title="Изображение">
                            <span className={styles.avatarItemTag}>
                                <Photo />
                            </span>
                        </Tooltip>
                    )}

                    {requiredSubscription && (
                        <Tooltip
                            destroyTooltipOnHide
                            title={`Для покупки требуется подписка ${requiredSubscription.subscription}`}
                        >
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
                        <Tooltip
                            destroyTooltipOnHide
                            title={`Для покупки требуется достижение "${requiredAchievement.achievement}"`}
                        >
                            <span className={styles.avatarItemTag}>
                                <Trophy />
                            </span>
                        </Tooltip>
                    )}

                    {(seasonStartDate || seasonEndDate) && (
                        <Tooltip
                            destroyTooltipOnHide
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

export default AvatarStoreItem;
