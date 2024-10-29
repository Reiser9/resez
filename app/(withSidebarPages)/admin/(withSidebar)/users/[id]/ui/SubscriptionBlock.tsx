import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from 'antd';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';

import { formatDate } from '@/shared/utils/formatDate';
import useAlert from '@/shared/hooks/useAlert';
import { useSubscription } from '@/features/subscription';
import { useUsers } from '@/features/user';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { ConfirmModal, Modal } from '@/shared/ui/Modal';
import { Select } from '@/shared/ui/Select';
import { DatePicker } from '@/shared/ui/DatePicker';
import { SubscriptionOfUser } from '@/entities/subscription';

type Props = {
    subscription?: SubscriptionOfUser;
};

const SubscriptionBlock: React.FC<Props> = ({ subscription }) => {
    const { id } = useParams();

    const { isSubscriptionPermanent, subscription: subscriptionName, subscriptionExpiredDate } = subscription || {};

    const queryClient = useQueryClient();
    const { getSubscriptions, assignSubscription } = useSubscription();
    const { removeUserSubscription } = useUsers();
    const { alertNotify } = useAlert();

    const [confirmModal, setConfirmModal] = React.useState(false);

    const [subscriptionAddModal, setSubscriptionAddModal] = React.useState(false);
    const [subscriptionId, setSubscriptionId] = React.useState<number | null>(null);
    const [isPermanentSubscription, setIsPermanentSubscription] = React.useState(false);
    const [expiredDateSubscripion, setExpiredDateSubscripion] = React.useState<Dayjs | null>();

    const {
        data: subscriptionsData,
        isLoading: subscriptionsIsLoading,
        isError: subscriptionsIsError,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: () => getSubscriptions(),
    });

    const invalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_user_main_info'] });
    };

    const removeUserSubscriptionMutation = useMutation({
        mutationFn: async () => {
            await removeUserSubscription(String(id), () => {
                setSubscriptionId(null);
                setIsPermanentSubscription(false);
                setExpiredDateSubscripion(null);
                invalidateRequest();
            });
        },
    });

    const assignSubscriptionMutation = useMutation({
        mutationFn: async () => {
            if (!subscriptionId) {
                return alertNotify('Предупреждение', 'Подписка не может быть пустой', 'warn');
            }
            if (!isPermanentSubscription && !expiredDateSubscripion) {
                return alertNotify('Предупреждение', 'Требуется выбрать дату окончания подписки', 'warn');
            }

            return await assignSubscription(
                subscriptionId,
                String(id),
                expiredDateSubscripion,
                isPermanentSubscription,
                () => {
                    setSubscriptionAddModal(false);
                    invalidateRequest();
                },
            );
        },
    });

    React.useEffect(() => {
        if (subscription) {
            const { id, isSubscriptionPermanent, subscriptionExpiredDate } = subscription;

            setSubscriptionId(id);
            setIsPermanentSubscription(isSubscriptionPermanent);
            subscriptionExpiredDate && setExpiredDateSubscripion(dayjs(subscriptionExpiredDate));
        }
    }, [subscription]);

    return (
        <>
            <div className={styles.userInfoItem}>
                <Text variant="h4" fontWeight={600}>
                    Подписка
                </Text>

                <Text variant="text2" fontWeight={600}>
                    Подписка: {subscriptionName ?? 'Нет'}
                </Text>
                {subscriptionName && (
                    <Text variant="text2" fontWeight={600}>
                        Истекает: {isSubscriptionPermanent ? 'Никогда' : formatDate(subscriptionExpiredDate)}
                    </Text>
                )}

                <Button
                    loading={assignSubscriptionMutation.isPending}
                    variant="light"
                    onClick={() => setSubscriptionAddModal(true)}
                >
                    Выдать подписку
                </Button>

                {subscriptionName && (
                    <Button
                        loading={removeUserSubscriptionMutation.isPending}
                        variant="light"
                        color="danger"
                        onClick={() => setConfirmModal(true)}
                    >
                        Удалить подписку
                    </Button>
                )}
            </div>

            <Modal title="Выдача подписки" value={subscriptionAddModal} setValue={setSubscriptionAddModal} size="small">
                <Select
                    title="Выберите подписку"
                    notContentText="Подписок не найдено"
                    value={subscriptionId}
                    loading={subscriptionsIsLoading}
                    error={subscriptionsIsError}
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

                <Button
                    loading={assignSubscriptionMutation.isPending}
                    variant="light"
                    onClick={() => assignSubscriptionMutation.mutate()}
                >
                    Выдать
                </Button>
            </Modal>

            <ConfirmModal
                text="Вы действительно хотите удалить подписку?"
                value={confirmModal}
                setValue={setConfirmModal}
                loading={removeUserSubscriptionMutation.isPending}
                callback={() => removeUserSubscriptionMutation.mutate()}
            />
        </>
    );
};

export default SubscriptionBlock;
