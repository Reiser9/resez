'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { SessionItem } from '@/shared/ui/SessionItem';
import { useSessions } from '@/features/user';
import { Cross, Reload } from '@/shared/icons';
import { useLogout } from '@/features/user';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { NotContent } from '@/shared/ui/NotContent';
import { IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { BackButton } from '@/shared/ui/Button';
import { SessionItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';

const ProfileSessions = () => {
    const { sessionsIsLoading, getPaginationSessions, endSessionById } = useSessions();
    const { isLoading, logout } = useLogout();
    const queryClient = useQueryClient();

    const revalidateSessions = () => {
        queryClient.invalidateQueries({ queryKey: ['sessions'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['sessions'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['sessions'],
        queryFn: (pageParam) => getPaginationSessions(pageParam),
    });

    const endSessionByIdHandler = (id: number) => {
        endSessionById(id, revalidateSessions);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <BackButton />

                    <Text variant="h3">
                        Сеансы{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount + 1})`}
                    </Text>
                </div>

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
                        {data?.pages[0]?.current && (
                            <SessionItem current data={data?.pages[0]?.current} callback={logout} loading={isLoading} />
                        )}

                        {data?.pages.map((session) =>
                            session?.other?.map((data) => (
                                <SessionItem
                                    key={data.id}
                                    data={data}
                                    callback={() => endSessionByIdHandler(data.id)}
                                    loading={sessionsIsLoading.includes(data.id)}
                                />
                            )),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            )}
        </div>
    );
};

export default ProfileSessions;
