'use client';

import React from 'react';
import cn from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Enter, ResCoin } from '@/shared/icons';
import { useUsers } from '@/features/user';
import { useSubscription } from '@/features/subscription';
import { formatDate } from '@/shared/utils/formatDate';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { LvlProgressBar } from '@/shared/ui/LvlProgressBar';
import { Modal } from '@/shared/ui/Modal';
import { Select } from '@/shared/ui/Select';
import { Checkbox } from 'antd';
import { DatePicker } from '@/shared/ui/DatePicker';

const AdminUserById = () => {
    const { id } = useParams();
    const { getUserMainInfoById, removeUserSubscription } = useUsers();
    const { getSubscriptions, assignSubscription } = useSubscription();
    const queryClient = useQueryClient();

    const [subscriptionAddModal, setSubscriptionAddModal] = React.useState(false);
    const [subscriptionId, setSubscriptionId] = React.useState<number | null>(null);
    const [isPermanentSubscription, setIsPermanentSubscription] = React.useState(false);
    const [expiredDateSubscripion, setExpiredDateSubscripion] = React.useState<Dayjs | null>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['admin_user_main_info'],
        queryFn: () => getUserMainInfoById(String(id)),
        enabled: !!id,
    });

    const {
        data: subscriptionsData,
        isLoading: subscriptionsIsLoading,
        isError: subscriptionsIsError,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: () => getSubscriptions(),
    });

    const { subscription, levelInfo, balance, activity } = data || {};
    const { level, limit, xp } = levelInfo || {};
    const { isPermanent, expiredDate, subscription: subscriptionName } = subscription || {};

    const invalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_user_main_info'] });
    };

    const removeUserSubscriptionHandler = () => {
        removeUserSubscription(String(id), () => {
            setSubscriptionId(null);
            setIsPermanentSubscription(false);
            setExpiredDateSubscripion(null);
            invalidateRequest();
        });
    };

    const assignSubscriptionHandler = () => {
        if (!subscriptionId) return;

        assignSubscription(subscriptionId, String(id), expiredDateSubscripion, isPermanentSubscription, () => {
            setSubscriptionAddModal(false);
            invalidateRequest();
        });
    };

    React.useEffect(() => {
        if (subscription) {
            const { id, isPermanent, expiredDate } = subscription;

            setSubscriptionId(id);
            setIsPermanentSubscription(isPermanent);
            expiredDate && setExpiredDateSubscripion(dayjs(expiredDate));
        }
    }, [subscription]);

    if (isLoading) {
        return <Preloader page small />;
    }

    return (
        <>
            <div className={styles.userInfo}>
                <div className={styles.userInfoItem}>
                    <Text variant="h4" fontWeight={600}>
                        Баланс
                    </Text>

                    <div className={styles.userInfoBalance}>
                        <Text fontWeight={600}>{balance}</Text>
                        <ResCoin />
                    </div>

                    <Button variant="light">Изменить</Button>
                </div>

                <div className={styles.userInfoItem}>
                    <Text variant="h4" fontWeight={600}>
                        Уровень
                    </Text>

                    <LvlProgressBar level={level || 0} xp={xp || 0} limit={limit || 0} />
                </div>

                <div className={styles.userInfoItem}>
                    <Text variant="h4" fontWeight={600}>
                        Подписка
                    </Text>

                    <Text variant="text2" fontWeight={600}>
                        Подписка: {subscriptionName ?? 'Нет'}
                    </Text>
                    {subscriptionName && (
                        <Text variant="text2" fontWeight={600}>
                            Истекает: {isPermanent ? 'Никогда' : formatDate(expiredDate)}
                        </Text>
                    )}

                    <Button variant="light" onClick={() => setSubscriptionAddModal(true)}>
                        Выдать подписку
                    </Button>

                    {subscriptionName && (
                        <Button variant="light" color="danger" onClick={removeUserSubscriptionHandler}>
                            Удалить подписку
                        </Button>
                    )}
                </div>

                <div className={styles.userInfoItem}>
                    <Text variant="h4" fontWeight={600}>
                        Активность
                    </Text>

                    <div className={base.baseWrapperGap8}>
                        {!!activity?.length &&
                            activity.map((data) => (
                                <div key={data.id} className={styles.activityItem}>
                                    <div className={base.titleWrapper}>
                                        {data.type === 'Login' ? (
                                            <div className={cn(styles.activityItemIcon, styles.green)}>
                                                <Enter />
                                            </div>
                                        ) : (
                                            <div className={cn(styles.activityItemIcon, styles.red)}>
                                                <Enter />
                                            </div>
                                        )}

                                        <Text variant="text2" fontWeight={600}>
                                            {data.type}
                                        </Text>
                                    </div>

                                    <Text variant="text2" fontWeight={600}>
                                        {formatDate(data.date)}
                                    </Text>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <Modal title="Выдача подписки" value={subscriptionAddModal} setValue={setSubscriptionAddModal} size="small">
                <Select
                    title="Выберите подписку"
                    value={subscriptionId}
                    notContentText="Подписок не найдено"
                    loading={subscriptionsIsLoading}
                    onChange={(value) => setSubscriptionId(value)}
                    options={subscriptionsData?.map((data) => ({
                        label: data.subscription,
                        value: data.id,
                    }))}
                />

                <Checkbox
                    checked={isPermanentSubscription}
                    onChange={(e) => setIsPermanentSubscription(e.target.checked)}
                >
                    Выдать бессрочно
                </Checkbox>

                {!isPermanentSubscription && (
                    <DatePicker
                        disablePrevDate
                        title="Дата истечения"
                        value={expiredDateSubscripion}
                        setValue={setExpiredDateSubscripion}
                    />
                )}

                <Button variant="light" onClick={assignSubscriptionHandler}>
                    Выдать
                </Button>
            </Modal>
        </>
    );
};

export default AdminUserById;
