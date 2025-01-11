'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from '../index.module.scss';

import type { Subscription, SubscriptionOfUser } from '@/entities/subscription';
import { ResCoin, SubDecor1, SubDecor2, SubDecor3, SubDecor4, SubDecor5, SubDecor6 } from '@/shared/icons';
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
            <div className={styles.subscriptionItem} key={data.id}>
                <div className={cn(styles.subscriptionItemTop, styles.long)}>
                    {data.subscription === 'ResEz Premium' ? (
                        <>
                            <SubDecor1 className={styles.subscriptionItemDecor1} />
                            <SubDecor2 className={styles.subscriptionItemDecor2} />
                            <SubDecor3 className={styles.subscriptionItemDecor3} />
                        </>
                    ) : (
                        <>
                            <SubDecor4 className={styles.subscriptionItemDecor1} />
                            <SubDecor6 className={styles.subscriptionItemDecor2} />
                            <SubDecor5 className={styles.subscriptionItemDecor3} />
                        </>
                    )}

                    <div className={styles.subscriptionItemIconInner}>
                        <Image src={icon} alt={subscription} fill />
                    </div>

                    <div className={styles.subscriptionInfo}>
                        <p className={styles.subscriptionInfoTitle}>{data.subscription}</p>

                        <p className={styles.subscriptionInfoPrice}>
                            {data.price} <ResCoin /> в месяц
                        </p>

                        {isAuth ? (
                            subscriptionOfUserId !== id && (
                                <Button onClick={() => setConfirmBuy(true)}>Подключить</Button>
                            )
                        ) : (
                            <Button href="/login">Авторизоваться</Button>
                        )}

                        {subscriptionOfUserId === id && (
                            <>
                                <Text variant="text2" fontWeight={600} center>
                                    Подключено, истекает{' '}
                                    {isSubscriptionPermanent ? 'никогда' : formatDate(subscriptionExpiredDate)}
                                </Text>

                                <Button small variant="empty" color="danger">
                                    Отключить
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.subscriptionItemContent}>
                    <div className={styles.subscriptionItemContentWrap}>
                        {data.subscription === 'ResEz Premium' ? (
                            <>
                                <Text fontWeight={600} color="main">
                                    Больше контента, больше шансов на успех!
                                </Text>

                                <div className={styles.subscriptionItemPoints}>
                                    <p className={styles.subscriptionItemPoint}>Всё, что было в ResEz Free</p>

                                    <p className={styles.subscriptionItemPoint}>Отправка файлов в мессенджере</p>

                                    <p className={styles.subscriptionItemPoint}>Подробная аналитика и статистика решений.</p>

                                    <p className={styles.subscriptionItemPoint}>Голосовые сообщения в месседжере</p>

                                    <p className={styles.subscriptionItemPoint}>
                                        Бесплатная персонализация каждый месяц
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <Text fontWeight={600} color="main">
                                    Идеальное решение для максимальной подготовки к ЕГЭ!
                                </Text>

                                <div className={styles.subscriptionItemPoints}>
                                    <p className={styles.subscriptionItemPoint}>Всё, что было в ResEz Plus</p>

                                    <p className={styles.subscriptionItemPoint}>Отправка файлов в мессенджере большего объема</p>

                                    <p className={styles.subscriptionItemPoint}>Звонки и видеосообщения</p>

                                    <p className={styles.subscriptionItemPoint}>Улучшенная персонализация каждый месяц</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmModal
                value={confirmBuy}
                setValue={setConfirmBuy}
                rejectCallback={() => buyCallback(id)}
                rejectText="Да"
                confirmText="Нет"
            >
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
