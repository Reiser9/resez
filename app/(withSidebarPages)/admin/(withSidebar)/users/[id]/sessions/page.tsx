'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { Cross, Reload } from '@/shared/icons';
import { useSessions, useUsers } from '@/features/user';

import { BackButton, Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { SessionItemSkeleton } from '@/shared/ui/Skeleton';
import { SessionItem } from '@/shared/ui/SessionItem';
import { NotContent } from '@/shared/ui/NotContent';

const AdminUserByIdSessions = () => {
    const { getUserSessions } = useUsers();

    const queryClient = useQueryClient();
    const { id } = useParams();

    const revalidateSessions = () => {
        queryClient.invalidateQueries({ queryKey: ['user_sessions_by_id', id] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['user_sessions_by_id', id] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['user_sessions_by_id', id],
        queryFn: (param) => getUserSessions(param.pageParam, String(id)),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!id,
    });

    return (
        <div className={base.baseWrapperGap8}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Сеансы{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount + 1})`}
                </Text>

                <IconButton circle small onClick={resetRequest} disabled={isPending}>
                    <Reload />
                </IconButton>
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <SessionItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : (
                <div className={base.contentItems}>
                    {data?.pages.map((session) =>
                        session?.sessions?.map((data) => <SessionItem key={data.id} data={data} />),
                    )}
                </div>
            )}

            {!isError && hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default AdminUserByIdSessions;
