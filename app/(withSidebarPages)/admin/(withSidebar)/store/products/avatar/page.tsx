'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Plus } from '@/shared/icons';
import { useAvatar } from '@/features/store';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { AvatarItem } from '@/entities/store/ui';
import { useUserPermissions } from '@/features/user';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { NotContent } from '@/shared/ui/NotContent';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { IconButton, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';

const AdminStoreAvatar = () => {
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getPaginationAvatars, togglePublishAvatar, deleteAvatar } = useAvatar();

    const revalidateAvatars = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_avatars'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_avatars'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['admin_avatars'],
        queryFn: (pageParam) => getPaginationAvatars(pageParam),
    });

    const togglePublishHandler = (id: number) => {
        togglePublishAvatar(id, revalidateAvatars);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Аватарки{' '}
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
            ) : data?.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((avatar) =>
                            avatar?.products?.map((data) => (
                                <AvatarItem
                                    key={data.id}
                                    data={data}
                                    edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_PRODUCTS])}
                                    publish={checkPermission(permissions || [], [PERMISSIONS.PUBLISH_PRODUCTS])}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_PRODUCTS])}
                                    togglePublish={() => togglePublishHandler(data.id)}
                                    deleteCallback={() => deleteAvatar(data.id, revalidateAvatars)}
                                />
                            )),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Украшений аватарок не найдено" />
            )}
        </div>
    );
};

export default AdminStoreAvatar;
