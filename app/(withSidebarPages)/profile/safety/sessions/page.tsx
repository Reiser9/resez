'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { BackButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { SessionItem } from '@/shared/ui/SessionItem';
import { useSessions } from '@/features/user';
import { Reload } from '@/shared/icons/Reload';
import { IconButton, Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { useLogout } from '@/features/user';
import { SessionItemSkeleton } from '@/shared/ui/Skeleton';

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

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['sessions'],
        queryFn: getPaginationSessions,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
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
                        Сеансы {!isPending && data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount + 1})`}
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
            ) : error ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : (
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
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default ProfileSessions;
