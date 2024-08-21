'use client';

import React from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { useUserPermissions, useUsers } from '@/features/user';
import { UserItem } from '@/shared/ui/UserItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { UserAdminItemSkeleton } from '@/shared/ui/Skeleton';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

const AdminUsers = () => {
    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });
    const { usersIsLoading, getPaginationUsers, blockUser, unblockUser } = useUsers();
    const queryClient = useQueryClient();

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['adminUsers'],
        queryFn: (param) => getPaginationUsers(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        refetchInterval: 10000,
    });

    const revalidateUsers = () => {
        queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['adminUsers'] });
    };

    return (
        <PrivateWrapper permissions={[PERMISSIONS.USERS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Пользователи{' '}
                        {!isError &&
                            !isPending &&
                            data?.pages[0]?.totalCount !== 0 &&
                            `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <UserAdminItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.pages[0]?.totalCount === 0 ? (
                    <NotContent text="Пользователей не найдено" />
                ) : (
                    <div className={base.contentItems}>
                        {data?.pages.map((user) =>
                            user?.users.map((data) => (
                                <UserItem
                                    key={data.id}
                                    data={data}
                                    userBlock={(reason: string) => blockUser(data.id, reason, () => revalidateUsers())}
                                    userUnblock={() => unblockUser(data.id, () => revalidateUsers())}
                                    notify={checkPermission(permissions || [], [PERMISSIONS.NOTIFIES])}
                                    block={checkPermission(permissions || [], [PERMISSIONS.BLOCK_USERS])}
                                    loading={usersIsLoading.includes(data.id)}
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
        </PrivateWrapper>
    );
};

export default AdminUsers;
