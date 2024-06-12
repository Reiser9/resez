'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';

import useArchive from '@/features/user/admin/useArchive';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Restore } from '@/shared/icons';
import SubjectItemSkeleton from '@/shared/ui/Skeleton/SubjectItemSceleton';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import SubjectItem from '@/entities/subject/ui/SubjectItem';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Tooltip } from 'antd';
import { RoleItem } from '@/shared/ui/RoleItem';
import { RoleItemSkeleton } from '@/shared/ui/Skeleton';
import { useRoles } from '@/features/role';

const AdminArchiveRoles = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const queryClient = useQueryClient();
    const { getArhiveRoles } = useArchive();
    const { rolesIsLoading, deleteRole } = useRoles();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['archive_roles'] });
    };

    const revalidateRoles = () => {
        queryClient.invalidateQueries({ queryKey: ['archive_roles'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['archive_roles'],
        queryFn: getArhiveRoles,
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
                        Роли {!error && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                <Tooltip title="Восстановить все">
                    <IconButton small variant="light">
                        <Restore />
                    </IconButton>
                </Tooltip>
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <RoleItemSkeleton key={id} />
                    ))}
                </div>
            ) : error ? (
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
                                    edit={checkPermission(permissions, [PERMISSIONS.UPDATE_ROLES])}
                                    remove={checkPermission(permissions, [PERMISSIONS.DELETE_ROLES])}
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
