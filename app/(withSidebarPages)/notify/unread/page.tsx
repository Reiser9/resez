'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { NotifyItem } from '@/shared/ui/Notify';
import { useNotify } from '@/features/notify';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { NotifyItemSkeleton } from '@/shared/ui/Skeleton';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';

const UnreadNotifyPage = () => {
    const { isLoading, notifyIsLoading, getPaginationNotifies, readNotifyById, readAllNotifies } = useNotify();
    const queryClient = useQueryClient();

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['notify'],
        queryFn: (pageParam) => getPaginationNotifies(pageParam, true),
    });

    const revalidateNotify = () => {
        queryClient.invalidateQueries({ queryKey: ['notify'] });
        queryClient.invalidateQueries({ queryKey: ['notify_count'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['notify'] });
    };

    const readNotify = (id: number) => {
        readNotifyById(id);
    };

    const readAllNotifiesHandler = () => {
        readAllNotifies(() => revalidateNotify());
    };

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Уведомления{' '}
                        {!isError &&
                            !isPending &&
                            data?.pages[0]?.totalCount !== 0 &&
                            `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                <Button
                    auto
                    variant="light"
                    onClick={readAllNotifiesHandler}
                    loading={isLoading}
                    disabled={!data?.pages[0]?.totalCount}
                >
                    Прочитать все
                </Button>
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(4)].map((_, id) => (
                        <NotifyItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((notify) =>
                            notify?.notifications.map((data) => (
                                <NotifyItem
                                    key={data.id}
                                    data={data}
                                    callback={() => readNotify(data.id)}
                                    loading={notifyIsLoading.includes(data.id)}
                                    unread
                                />
                            )),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Уведомлений не найдено" />
            )}
        </div>
    );
};

export default UnreadNotifyPage;
