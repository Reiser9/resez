'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { useNotify } from '@/features/notify';
import { Cross } from '@/shared/icons';
import { NotifyItem } from '@/entities/notify/ui';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';

const AdminNotifiesLog = () => {
    const { getPagginationAdminNotifies } = useNotify();

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_notifies'],
        queryFn: (param) => getPagginationAdminNotifies(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <>
            <div className={base.titleInner}>
                <Text variant="h3">
                    История уведомлений{' '}
                    {!isError && !isPending && data?.pages[0]?.totalCount !== 0 && `(${data?.pages[0]?.totalCount})`}
                </Text>
            </div>

            {isPending ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount === 0 ? (
                <NotContent text="Уведомлений не найдено" />
            ) : (
                <div className={base.contentItems}>
                    {data?.pages.map((notify) =>
                        notify?.notifications?.map((data) => <NotifyItem key={data.id} data={data} />),
                    )}
                </div>
            )}

            {!isError && hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </>
    );
};

export default AdminNotifiesLog;
