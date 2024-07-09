'use client';

import React from 'react';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { Cross, Plus } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useAvatar } from '@/features/store';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { NotContent } from '@/shared/ui/NotContent';
import AvatarItem from '@/entities/store/ui/AvatarItem';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';

const AdminStoreAvatar = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const queryClient = useQueryClient();
    const { getPaginationAvatars, togglePublishAvatar } = useAvatar();

    const revalidateAvatars = () => {
        queryClient.invalidateQueries({ queryKey: ['admin_avatars'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['admin_avatars'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['admin_avatars'],
        queryFn: getPaginationAvatars,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    const togglePublishHandler = (id: number) => {
        togglePublishAvatar(id, revalidateAvatars);
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Аватарки {!isPending && data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                {checkPermission(permissions, [PERMISSIONS.CREATE_PRODUCTS]) && (
                    <Tooltip title="Создать">
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
            ) : error ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data.pages[0]?.totalCount ? (
                <div className={base.contentItems}>
                    {data?.pages.map((avatar) =>
                        avatar?.products?.map((data) => (
                            <AvatarItem
                                key={data.id}
                                data={data}
                                edit={checkPermission(permissions, [PERMISSIONS.UPDATE_PRODUCTS])}
                                publish={checkPermission(permissions, [PERMISSIONS.PUBLISH_PRODUCTS])}
                                remove={checkPermission(permissions, [PERMISSIONS.DELETE_PRODUCTS])}
                                togglePublish={() => togglePublishHandler(data.id)}
                            />
                        )),
                    )}
                </div>
            ) : (
                <NotContent text="Украшений аватарок не найдено" />
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default AdminStoreAvatar;
