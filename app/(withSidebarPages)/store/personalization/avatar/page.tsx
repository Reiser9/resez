'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { useAvatar } from '@/features/store';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import AvatarStoreItem from '@/entities/store/ui/AvatarStoreItem';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { useAppSelector } from '@/shared/hooks/useRedux';

const StorePersonalizationAvatar = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const queryClient = useQueryClient();
    const router = useRouter();
    const { getPaginationStoreAvatars, addProductToProfile } = useAvatar();

    const revalidateAvatars = () => {
        queryClient.invalidateQueries({ queryKey: ['store_avatars'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['store_avatars'] });
    };

    const addProductToProfileHandler = (id: number) => {
        if (!isAuth) {
            return router.push('/login');
        }

        addProductToProfile(id, revalidateAvatars);
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['store_avatars'],
        queryFn: getPaginationStoreAvatars,
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
                    Украшения {!isError && !isPending && data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
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
                    {data?.pages.map((avatar) =>
                        avatar?.products?.map((data) => (
                            <AvatarStoreItem
                                key={data.id}
                                data={data}
                                addProductToProfile={() => addProductToProfileHandler(data.id)}
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

export default StorePersonalizationAvatar;
