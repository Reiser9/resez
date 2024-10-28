import React from 'react';
import Image from 'next/image';

import styles from '../index.module.scss';

import type { Subscription, SubscriptionOfUser } from '@/entities/subscription';
import { ResCoin } from '@/shared/icons';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { formatDate } from '@/shared/utils/formatDate';

type Props = {
    data: Subscription;
    userSubscription?: SubscriptionOfUser;
    buyCallback: (value: number) => void;
};

const SubscriptionItem: React.FC<Props> = ({ data, userSubscription, buyCallback }) => {
    const { id, subscription, icon, price } = data || {};
    const { isSubscriptionPermanent, subscriptionExpiredDate, id: subscriptionOfUserId } = userSubscription || {};

    const [confirmBuy, setConfirmBuy] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);

    return (
        <>
            <div className={styles.subscriptionItem}>
                <div className={styles.subscriptionItemIcon}>
                    <div className={styles.subscriptionItemIconInner}>
                        <Image src={icon} alt={subscription} fill />
                    </div>

                    <Text variant="h3">{subscription}</Text>
                </div>

                <Text fontWeight={600} textClassName={styles.subscriptionItemPrice}>
                    Цена: {price} <ResCoin />
                </Text>

                {isAuth ? (
                    subscriptionOfUserId !== id && (
                        <Button variant="light" onClick={() => setConfirmBuy(true)}>
                            Купить
                        </Button>
                    )
                ) : (
                    <Button variant="light" href="/login">
                        Авторизоваться
                    </Button>
                )}

                {subscriptionOfUserId === id && (
                    <Text fontWeight={600}>
                        Подписка истекает: {isSubscriptionPermanent ? 'Никогда' : formatDate(subscriptionExpiredDate)}
                    </Text>
                )}
            </div>

            <ConfirmModal value={confirmBuy} setValue={setConfirmBuy} callback={() => buyCallback(id)}>
                <Text>Вы действительно хотите купить подписку {subscription}?</Text>

                {subscriptionOfUserId && (
                    <Text color="error" fontWeight={600}>
                        Обратите внимание, что ваша текущая подписка будет заменена на новую, и доступ к ней будет
                        потерян. Продолжить?
                    </Text>
                )}
            </ConfirmModal>
        </>
    );
};

export default SubscriptionItem;
