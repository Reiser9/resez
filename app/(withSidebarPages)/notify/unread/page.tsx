'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotifyItem } from '@/shared/ui/Notify';
import { useNotify } from '@/features/notify';
import { NotifyItemSkeleton } from '@/shared/ui/Skeleton';

const UnreadNotifyPage = () => {
    const { isLoading, notifyIsLoading, getPaginationNotifies, readNotifyById, readAllNotifies } = useNotify();
    const queryClient = useQueryClient();

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['notify'],
        queryFn: (param) => getPaginationNotifies(param.pageParam, true),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
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
            ) : data?.pages[0]?.totalCount === 0 ? (
                <NotContent text="Уведомлений не найдено" />
            ) : (
                <div className={base.contentItems}>
                    {data?.pages.map((session) =>
                        session?.notifies.map((data) => (
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
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default UnreadNotifyPage;
