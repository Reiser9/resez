'use client';

import React from 'react';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Plus } from '@/shared/icons';
import { useAvatar, useTheme } from '@/features/store';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { AvatarItem, ThemeItem } from '@/entities/store/ui';
import { useUserPermissions } from '@/features/user';

import { NotContent } from '@/shared/ui/NotContent';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const AdminStoreAvatar = () => {
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
    const { getPaginationThemes, togglePublishTheme, deleteTheme } = useTheme();

    const revalidateTheme = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_themes'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_themes'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_themes'],
        queryFn: (param) => getPaginationThemes(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    const togglePublishHandler = (id: number) => {
        togglePublishTheme(id, revalidateTheme);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Темы{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {checkPermission(permissions || [], [PERMISSIONS.CREATE_PRODUCTS]) && (
                    <Tooltip destroyTooltipOnHide title="Создать">
                        <IconButton href="/admin/store/create" variant="light" small circle>
                            <Plus />
                        </IconButton>
                    </Tooltip>
                )}
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <AvatarItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={base.contentItems}>
                    {data?.pages.map((theme) =>
                        theme?.products?.map((data) => (
                            <ThemeItem
                                key={data.id}
                                data={data}
                                edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_PRODUCTS])}
                                publish={checkPermission(permissions || [], [PERMISSIONS.PUBLISH_PRODUCTS])}
                                remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_PRODUCTS])}
                                togglePublish={() => togglePublishHandler(data.id)}
                                deleteCallback={() => deleteTheme(data.id, revalidateTheme)}
                            />
                        )),
                    )}
                </div>
            ) : (
                <NotContent text="Тем не найдено" />
            )}

            {!isError && hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default AdminStoreAvatar;
