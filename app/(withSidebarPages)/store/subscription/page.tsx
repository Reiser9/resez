'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useSubscription } from '@/features/subscription';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Cross, StudyHatPic } from '@/shared/icons';
import { useShortInfo } from '@/features/user';
import { refreshToken } from '@/shared/utils/refreshToken';
import SubscriptionItem from './ui/SubscriptionItem';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';

const StoreSubscription = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { getSubscriptions, buySubscription } = useSubscription();
    const { getShortInfo } = useShortInfo();
    const queryClient = useQueryClient();

    const invalidateShortInfo = () => {
        queryClient.invalidateQueries({ queryKey: ['short_info'] });
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: () => getSubscriptions(),
    });

    const { data: userInfo } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { subscription } = userInfo?.user || {};

    const buySubscriptionHandler = (subscriptionId: number | null) => {
        if (!subscriptionId) return;

        buySubscription(subscriptionId, () => {
            invalidateShortInfo();
            refreshToken();
        });
    };

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={styles.subscriptionContent}>
            {isError ? (
                <NotContent danger icon={<Cross />} text="Произошла ошибка при загрузке данных" />
            ) : (
                <>
                    <div className={styles.subscriptionItem}>
                        <div className={styles.subscriptionItemTop}>
                            <div className={styles.subscriptionItemIcon}>
                                <StudyHatPic />
                            </div>

                            <div className={styles.subscriptionInfo}>
                                <p className={styles.subscriptionInfoTitle}>ResEz FREE</p>

                                <p className={styles.subscriptionInfoPrice}>Бесплатно</p>

                                <Text variant="text2" fontWeight={600} center>
                                    Если у вас нет никаких подписок, то данный тариф подключается автоматически
                                </Text>
                            </div>
                        </div>

                        <div className={styles.subscriptionItemContent}>
                            <div className={styles.subscriptionItemContentWrap}>
                                <Text fontWeight={600} color="main">
                                    Всё необходимое для старта – совершенно бесплатно!
                                </Text>

                                <div className={styles.subscriptionItemPoints}>
                                    <p className={styles.subscriptionItemPoint}>Решение вариантов ЕГЭ с возможностью посмотреть историю решений</p>

                                    <p className={styles.subscriptionItemPoint}>
                                        Доступ к таблице баллов ЕГЭ
                                    </p>

                                    <p className={styles.subscriptionItemPoint}>
                                        Разборы заданий ЕГЭ
                                    </p>

                                    <p className={styles.subscriptionItemPoint}>
                                        Внутрипроектный мессенджер
                                    </p>

                                    <p className={styles.subscriptionItemPoint}>
                                        Лояльная поддержка
                                    </p>

                                    <p className={styles.subscriptionItemPoint}>Отсутствие рекламы.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!!data?.length &&
                        data.map((data) => (
                            <SubscriptionItem
                                key={data.id}
                                data={data}
                                buyCallback={buySubscriptionHandler}
                                userSubscription={subscription}
                            />
                        ))}
                </>
            )}
        </div>
    );
};

export default StoreSubscription;
