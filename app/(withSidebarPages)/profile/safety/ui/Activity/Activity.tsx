'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import styles from '../../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { IconButton, Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { Reload } from '@/shared/icons/Reload';
import { SessionItemMini } from '@/shared/ui/SessionItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { SessionItemMiniSkeleton } from '@/shared/ui/Skeleton';
import { useSessions } from '@/features/user';

const Activity = () => {
    const [confirmEndAllSessions, setConfirmEndAllSessions] = React.useState<boolean>(false);

    const queryClient = useQueryClient();
    const { isLoading, getSessions, endAllSessions } = useSessions();
    const router = useRouter();

    const { data, isFetching, error } = useQuery({ queryKey: ['sessions_short'], queryFn: getSessions });

    const revalidateSessions = () => {
        queryClient.invalidateQueries({ queryKey: ['sessions_short'] });
    };

    const endAllSessionsHandler = () => {
        endAllSessions(revalidateSessions);
    };

    return (
        <div className={styles.contentBlock}>
            <div className={base.titleInner}>
                <Text variant="h3">Активность</Text>

                <IconButton circle small onClick={revalidateSessions} disabled={isFetching}>
                    <Reload />
                </IconButton>
            </div>

            {error ? (
                <NotContent text="Ошибка при загрузке сеансов" icon={<Cross />} danger />
            ) : (
                <>
                    <div className={base.baseWrapperGap8}>
                        <Text>Текущий сеанс</Text>

                        {isFetching ? (
                            <SessionItemMiniSkeleton />
                        ) : (
                            <SessionItemMini
                                current
                                data={data?.current}
                                onClick={() => router.push('safety/sessions')}
                            />
                        )}

                        <Button
                            disabled={isFetching}
                            variant="empty"
                            color="danger"
                            onClick={() => setConfirmEndAllSessions(true)}
                        >
                            Завершить другие сеансы
                        </Button>
                    </div>

                    <div className={base.baseWrapperGap8}>
                        <Text>Все сеансы {!isFetching && `(${data?.totalCount})`}</Text>

                        {isFetching
                            ? [...Array(3)].map((_, id) => <SessionItemMiniSkeleton key={id} />)
                            : data?.other
                                  .slice(0, 3)
                                  .map((data) => (
                                      <SessionItemMini
                                          key={data.id}
                                          data={data}
                                          onClick={() => router.push('safety/sessions')}
                                      />
                                  ))}

                        {(data?.totalCount || 0) >= 3 && (
                            <Button variant="empty" href="safety/sessions">
                                Показать все
                            </Button>
                        )}
                    </div>
                </>
            )}

            <ConfirmModal
                value={confirmEndAllSessions}
                setValue={setConfirmEndAllSessions}
                callback={endAllSessionsHandler}
                loading={isLoading}
                text="Вы действительно хотите завершить все сессии, кроме текущей?"
                confirmText="Завершить"
                rejectText="Отмена"
            />
        </div>
    );
};

export default Activity;
