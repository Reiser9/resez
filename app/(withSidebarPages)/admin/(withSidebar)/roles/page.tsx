'use client';

import React from 'react';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { RoleItem } from '@/shared/ui/RoleItem';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Plus } from '@/shared/icons';
import { useRoles } from '@/features/role';
import { RoleItemSkeleton } from '@/shared/ui/Skeleton';

const AdminRoles = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const queryClient = useQueryClient();
    const { rolesIsLoading, getPaginationRoles, deleteRole } = useRoles();

    const revalidateRoles = () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['roles'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['roles'],
        queryFn: (param) => getPaginationRoles(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Роли {!isPending && data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {checkPermission(permissions, [PERMISSIONS.CREATE_ROLES]) && (
                    <Tooltip title="Создать">
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
            ) : error ? (
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
                                edit={checkPermission(permissions, [PERMISSIONS.UPDATE_ROLES])}
                                remove={checkPermission(permissions, [PERMISSIONS.DELETE_ROLES])}
                            />
                        )),
                    )}
                </div>
            ) : (
                <NotContent text="Ролей не найдено" />
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default AdminRoles;
