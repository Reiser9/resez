'use client';

import React from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from 'antd';

import base from '@/shared/styles/base.module.scss';

import { useUserPermissions, useUsers } from '@/features/user';
import { UserItem } from '@/shared/ui/UserItem';
import { Cross, Filter } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { UserAdminItemSkeleton } from '@/shared/ui/Skeleton';
import { Modal } from '@/shared/ui/Modal';
import { Select } from '@/shared/ui/Select';
import { SearchInput } from '@/shared/ui/SearchInput';
import { useRoles } from '@/features/role';

const AdminUsers = () => {
    const [usersFilter, setUsersFilter] = React.useState(false);

    const [onlyOnline, setOnlyOnline] = React.useState(false);
    const [isBlocked, setIsBlocked] = React.useState<string | null>(null);
    const [isVerify, setIsVerify] = React.useState<string | null>(null);
    const [hasRole, setHasRole] = React.useState(false);
    const [roleId, setRoleId] = React.useState<string | null>(null);
    const [searchValue, setSearchValue] = React.useState('');
    const userSearchDebounce = useDebounce(searchValue, 500);

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
    const { getPaginationRoles } = useRoles();
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const router = useRouter();
    const online = searchParams.get('online');
    const blocked = searchParams.get('blocked');
    const verified = searchParams.get('verified');
    const isHasRole = searchParams.get('has_role');
    const role = searchParams.get('role');

    const revalidateUsers = () => {
        queryClient.invalidateQueries({
            queryKey: ['adminUsers', online, blocked, verified, isHasRole, role, userSearchDebounce],
        });
    };

    const resetRequest = () => {
        queryClient.resetQueries({
            queryKey: ['adminUsers', online, blocked, verified, isHasRole, role, userSearchDebounce],
        });
    };

    const {
        data: roles,
        isPending: rolesIsLoading,
        isError: rolesIsErrror,
    } = useQuery({
        queryKey: ['roles'],
        queryFn: () => getPaginationRoles(0),
    });

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

    const resetFilter = () => {
        setOnlyOnline(false);
        setIsBlocked('');
        setIsVerify('');
        setHasRole(false);
        setRoleId('');
        router.replace('/admin/users');
        setUsersFilter(false);
    };

    const applyFilters = () => {
        const newUrl = buildQueryString({
            online: onlyOnline || '',
            blocked: isBlocked,
            verified: isVerify,
            has_role: hasRole || '',
            role: hasRole ? roleId : '',
        });
        router.replace(`?${newUrl}`);
        setUsersFilter(false);
    };

    React.useEffect(() => {
        if (online && online === 'true') {
            setOnlyOnline(!!online);
        }
    }, [online]);

    React.useEffect(() => {
        if (blocked) {
            setIsBlocked(blocked);
        }
    }, [blocked]);

    React.useEffect(() => {
        if (verified) {
            setIsVerify(verified);
        }
    }, [verified]);

    React.useEffect(() => {
        if (isHasRole && isHasRole === 'true') {
            setHasRole(!!isHasRole);
        }
    }, [isHasRole]);

    React.useEffect(() => {
        if (role) {
            setRoleId(role);
        }
    }, [role]);

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

            <Modal value={usersFilter} setValue={setUsersFilter} title="Фильтры" size="small">
                <Checkbox checked={onlyOnline} onChange={(e) => setOnlyOnline(e.target.checked)}>
                    Только онлайн пользователи
                </Checkbox>

                <Select
                    title="Заблокирован"
                    onChange={(value) => setIsBlocked(value)}
                    value={isBlocked}
                    clear
                    options={[
                        {
                            label: 'Да',
                            value: 'true',
                        },
                        {
                            label: 'Нет',
                            value: 'false',
                        },
                    ]}
                />

                <Select
                    title="Верифицирован"
                    onChange={(value) => setIsVerify(value)}
                    value={isVerify}
                    clear
                    options={[
                        {
                            label: 'Да',
                            value: 'true',
                        },
                        {
                            label: 'Нет',
                            value: 'false',
                        },
                    ]}
                />

                <Checkbox checked={hasRole} onChange={(e) => setHasRole(e.target.checked)}>
                    Имеет роль
                </Checkbox>

                {checkPermission(permissions || [], [PERMISSIONS.ROLES]) && hasRole && (
                    <Select
                        title="Роль"
                        onChange={(value) => setRoleId(value)}
                        value={roleId}
                        clear
                        loading={rolesIsLoading}
                        error={rolesIsErrror}
                        options={roles?.roles.map((data) => ({
                            label: data.role,
                            value: String(data.id),
                            textColor: data.textColor,
                        }))}
                        optionRender={({ data }) => (
                            <Text style={{ color: data.textColor }} variant="text2">
                                {data.label}
                            </Text>
                        )}
                    />
                )}

                <Button variant="light" color="danger" onClick={resetFilter}>
                    Сбросить
                </Button>

                <Button onClick={applyFilters}>Применить</Button>
            </Modal>
        </PrivateWrapper>
    );
};

export default AdminUsers;
