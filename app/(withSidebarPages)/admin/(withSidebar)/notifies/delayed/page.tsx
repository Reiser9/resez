'use client';

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';

import { useNotify } from '@/features/notify';
import { Cross } from '@/shared/icons';
import { NotifyItem } from '@/entities/notify/ui';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const AdminNotifiesDelayed = () => {
    const { getPagginationAdminNotifies } = useNotify();

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['admin_notifies_delayed'],
        queryFn: (pageParam) => getPagginationAdminNotifies(pageParam, true),
    });

    return (
        <>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Отложенные уведомления{' '}
                    {!isError && !isPending && data?.pages[0]?.totalCount !== 0 && `(${data?.pages[0]?.totalCount})`}
                </Text>
            </div>

            {isPending ? (
                <Preloader page small />
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((notify) =>
                            notify?.notifications?.map((data) => <NotifyItem key={data.id} data={data} />),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Отложенных уведомлений не найдено" />
            )}
        </>
    );
};

export default AdminNotifiesDelayed;
