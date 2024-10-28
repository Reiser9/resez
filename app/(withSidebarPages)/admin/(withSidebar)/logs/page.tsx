'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useLogs } from '@/features/log';
import { Cross } from '@/shared/icons';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { LogItem } from '@/entities/log/ui';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { LogItemSkeleton } from '@/shared/ui/Skeleton';

const AdminLogs = () => {
    const { getPagginationLogs } = useLogs();

    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['logs'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['logs'],
        queryFn: (param) => getPagginationLogs(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.LOGS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Логирование{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(4)].map((_, id) => (
                            <LogItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={base.contentItems}>
                        {data?.pages.map((log) => log?.logs?.map((data) => <LogItem key={data.id} data={data} />))}
                    </div>
                ) : (
                    <NotContent text="Логов не найдено" />
                )}

                {!isError && hasNextPage && (
                    <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                        Показать еще
                    </Button>
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminLogs;
