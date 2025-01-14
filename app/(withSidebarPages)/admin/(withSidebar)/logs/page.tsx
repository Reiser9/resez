'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useLogs } from '@/features/log';
import { Cross } from '@/shared/icons';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { LogItem } from '@/entities/log/ui';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { LogItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';

const AdminLogs = () => {
    const { getPagginationLogs } = useLogs();

    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['logs'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['logs'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['logs'],
        queryFn: (pageParam) => getPagginationLogs(pageParam),
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
                ) : data?.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((log) => log?.logs?.map((data) => <LogItem key={data.id} data={data} />))}
                        </div>

                        {isFetchingNextPage && <Preloader offIndent small page />}

                        {!isFetchingNextPage && <div ref={endPage}></div>}
                    </div>
                ) : (
                    <NotContent text="Логов не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminLogs;
