'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { RoleItem } from '@/shared/ui/RoleItem';
import { RoleItemSkeleton } from '@/shared/ui/Skeleton';
import { useRoles } from '@/features/role';
import { useArchive, useUserPermissions } from '@/features/user';

const AdminArchiveRoles = () => {
    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getArhiveRoles } = useArchive();
    const { rolesIsLoading, deleteRole } = useRoles();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_roles'] });
    };

    const revalidateRoles = () => {
        queryClient.invalidateQueries({ queryKey: ['archive_roles'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['archive_roles'],
        queryFn: (param) => getArhiveRoles(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Роли {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <RoleItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Ошибка при загрузке предметов" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((subject) =>
                            subject?.roles.map((data) => (
                                <RoleItem
                                    key={data.id}
                                    data={data}
                                    deleteRole={() => deleteRole(String(data.id), revalidateRoles)}
                                    loading={rolesIsLoading.includes(String(data.id))}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_ROLES])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_ROLES])}
                                />
                            )),
                        )}
                    </div>

                    {hasNextPage && (
                        <Button
                            auto
                            onClick={fetchNextPage}
                            loading={isFetchingNextPage}
                            className={base.buttonShowMore}
                        >
                            Показать еще
                        </Button>
                    )}
                </div>
            ) : (
                <NotContent text="Ролей не найдено" />
            )}
        </div>
    );
};

export default AdminArchiveRoles;
