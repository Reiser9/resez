'use client';

import React from 'react';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Cross, Plus } from '@/shared/icons';
import { useRoles } from '@/features/role';
import { useUserPermissions } from '@/features/user';
import { RoleItem } from '@/entities/role/ui';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { RoleItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const AdminRoles = () => {
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
    const { rolesIsLoading, getPaginationRoles, deleteRole } = useRoles();

    const revalidateRoles = () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['roles'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['roles'],
        queryFn: (param) => getPaginationRoles(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.ROLES]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Роли{' '}
                            {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    {checkPermission(permissions || [], [PERMISSIONS.CREATE_ROLES]) && (
                        <Tooltip destroyTooltipOnHide title="Создать">
                            <IconButton href="roles/create" variant="light" small circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(4)].map((_, id) => (
                            <RoleItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={base.contentItems}>
                        {data?.pages.map((role) =>
                            role?.roles?.map((data) => (
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
                ) : (
                    <NotContent text="Ролей не найдено" />
                )}

                {!isError && hasNextPage && (
                    <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                        Показать еще
                    </Button>
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminRoles;
