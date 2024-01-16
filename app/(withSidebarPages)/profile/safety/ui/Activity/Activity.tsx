'use client';

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import styles from '../../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { ConfirmModal } from '@/shared/ui/Modal';
import { IconButton } from '@/shared/ui/IconButton';
import { Reload } from '@/shared/icons/Reload';
import { SessionItemMini } from '@/shared/ui/SessionItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import useSessions from '@/features/user/useSessions';

const Activity = () => {
    const [confirmEndAllSessions, setConfirmEndAllSessions] = React.useState<boolean>(false);

    const queryClient = useQueryClient()
    const { isLoading, getSessions, endAllSessions } = useSessions();

    const { data, isFetching, error } = useQuery({ queryKey: ['sessions'], queryFn: getSessions });

    const endAllSessionsHandler = (successCallback = () => {}) => {
        endAllSessions(successCallback);
        queryClient.invalidateQueries({queryKey: ['sessions']});
    }

    return (
        <div className={styles.contentBlock}>
            <div className={base.titleInner}>
                <Text variant="h3">Активность</Text>

                <IconButton circle small>
                    <Reload />
                </IconButton>
            </div>

            {isFetching ? (
                <p>Загрузка..</p>// <SessionsSkeleton />
            ) : error ? (
                <NotContent text="Ошибка при загрузке сеансов" icon={<Cross />} danger />
            ) : (
                <>
                    <div className={base.baseWrapperGap8}>
                        <Text>Текущий сеанс</Text>

                        <SessionItemMini
                            current
                            data={data?.data.current}
                        />

                        <Button variant="empty" color="danger" onClick={() => setConfirmEndAllSessions(true)}>
                            Завершить другие сеансы
                        </Button>
                    </div>

                    {/* Скелетоны, проверки, что есть сессии и т.п */}
                    <div className={base.baseWrapperGap8}>
                        <Text>Все сеансы ({data?.data.totalCount})</Text>

                        {data?.data.other.slice(0, 3).map((data) => (
                            <SessionItemMini
                                key={data.id}
                                data={data}
                            />
                        ))}

                        {true && (
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
