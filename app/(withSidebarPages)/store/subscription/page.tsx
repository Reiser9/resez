'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useSubscription } from '@/features/subscription';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Cross } from '@/shared/icons';
import { useShortInfo } from '@/features/user';
import SubscriptionItem from './ui/SubscriptionItem';
import { refreshToken } from '@/shared/utils/refreshToken';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

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
        <>
            <div className={styles.subscriptionWrapper}>
                {isError ? (
                    <NotContent danger icon={<Cross />} text="Произошла ошибка при загрузке данных" />
                ) : data?.length ? (
                    data.map((data) => (
                        <SubscriptionItem
                            key={data.id}
                            data={data}
                            buyCallback={buySubscriptionHandler}
                            userSubscription={subscription}
                        />
                    ))
                ) : (
                    <NotContent text="Подписок не найдено" />
                )}
            </div>
        </>
    );
};

export default StoreSubscription;
