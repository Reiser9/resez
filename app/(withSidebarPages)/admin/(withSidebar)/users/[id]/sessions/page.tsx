'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { Cross, Reload } from '@/shared/icons';
import { useSessions, useUsers } from '@/features/user';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { BackButton, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { SessionItemSkeleton } from '@/shared/ui/Skeleton';
import { SessionItem } from '@/shared/ui/SessionItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

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

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['user_sessions_by_id', String(id)],
        queryFn: (pageParam) => getUserSessions(pageParam, String(id)),
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
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((session) =>
                            session?.sessions?.map((data) => <SessionItem key={data.id} data={data} />),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            )}
        </div>
    );
};

export default AdminUserByIdSessions;
