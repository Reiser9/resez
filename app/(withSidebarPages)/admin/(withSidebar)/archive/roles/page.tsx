'use client';

import React from 'react';
import cn from 'classnames';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useRoles } from '@/features/role';
import { useArchive, useUserPermissions } from '@/features/user';
import { RoleItem } from '@/entities/role/ui';

import { RoleItemSkeleton } from '@/shared/ui/Skeleton';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const AdminArchiveRoles = () => {
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getArhiveRoles } = useArchive();
    const { rolesIsLoading, deleteRole } = useRoles();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_roles'] });
    };

    const revalidateRequest = () => {
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
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((subject) =>
                            subject?.roles.map((data) => (
                                <RoleItem
                                    key={data.id}
                                    data={data}
                                    deleteRole={() => deleteRole(String(data.id), revalidateRequest)}
                                    loading={rolesIsLoading.includes(String(data.id))}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_ROLES])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_ROLES])}
                                />
                            )),
                        )}
                    </div>

                    {!isError && hasNextPage && (
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
