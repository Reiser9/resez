'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { Cross } from '@/shared/icons';
import { useUsers } from '@/features/user';
import BalanceBlock from './ui/BalanceBlock';
import LvlBlock from './ui/LvlBlock';
import SubscriptionBlock from './ui/SubscriptionBlock';
import ActivityBlock from './ui/ActivityBlock';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminUserById = () => {
    const { id } = useParams();
    const { getUserMainInfoById } = useUsers();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin_user_main_info'],
        queryFn: () => getUserMainInfoById(String(id)),
        enabled: !!id,
    });

    const { subscription, levelInfo, balance, activity } = data || {};

    if (isLoading) {
        return <Preloader page small />;
    }

    return (
        <>
            <div className={styles.userInfo}>
                {isError ? (
                    <NotContent danger icon={<Cross />} text="Произошла ошибка при загрузке данных" />
                ) : (
                    <>
                        <BalanceBlock balance={balance} />

                        <LvlBlock levelInfo={levelInfo} />

                        <SubscriptionBlock subscription={subscription} />

                        <ActivityBlock activity={activity} />
                    </>
                )}
            </div>
        </>
    );
};

export default AdminUserById;
