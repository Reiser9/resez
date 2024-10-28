'use client';

import React from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useUserPermissions, useUsers } from '@/features/user';
import { Cross, Filter } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { UserItem } from '@/entities/admin/ui';
import UsersFilter from './UsersFilter';

import { SearchInput } from '@/shared/ui/Input';
import { NotContent } from '@/shared/ui/NotContent';
import { UserAdminItemSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';

const AdminUsers = () => {
    const [usersFilter, setUsersFilter] = React.useState(false);

    const [searchValue, setSearchValue] = React.useState('');
    const userSearchDebounce = useDebounce(searchValue, 500);

    const searchParams = useSearchParams();
    const online = searchParams.get('online');
    const blocked = searchParams.get('blocked');
    const verified = searchParams.get('verified');
    const isHasRole = searchParams.get('has_role');
    const role = searchParams.get('role');
    
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { usersIsLoading, getPaginationUsers, blockUser, unblockUser } = useUsers();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ['adminUsers', online, blocked, verified, isHasRole, role, userSearchDebounce],
        });
    };

    const resetRequest = () => {
        queryClient.resetQueries({
            queryKey: ['adminUsers', online, blocked, verified, isHasRole, role, userSearchDebounce],
        });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['adminUsers', online, blocked, verified, isHasRole, role, userSearchDebounce],
        queryFn: (param) =>
            getPaginationUsers(
                param.pageParam,
                online || '',
                blocked || '',
                verified || '',
                isHasRole || '',
                role || '',
                userSearchDebounce,
            ),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        refetchInterval: 10000,
    });

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

                    <div className={base.titleWrapper}>
                        <IconButton small variant="light" onClick={() => setUsersFilter(true)}>
                            <Filter />
                        </IconButton>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>
                </div>

                <SearchInput value={searchValue} setValue={setSearchValue} />

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
                                    userBlock={(reason: string) => blockUser(data.id, reason, () => revalidateRequest())}
                                    userUnblock={() => unblockUser(data.id, () => revalidateRequest())}
                                    notify={checkPermission(permissions || [], [PERMISSIONS.NOTIFIES])}
                                    block={checkPermission(permissions || [], [PERMISSIONS.BLOCK_USERS])}
                                    loading={usersIsLoading.includes(data.id)}
                                />
                            )),
                        )}
                    </div>
                )}

                {!isError && hasNextPage && (
                    <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                        Показать еще
                    </Button>
                )}
            </div>

            <UsersFilter
                filterOpen={usersFilter}
                setFilterOpen={setUsersFilter}
                online={online}
                blocked={blocked}
                verified={verified}
                isHasRole={isHasRole}
                role={role}
            />
        </PrivateWrapper>
    );
};

export default AdminUsers;
