'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { useAvatar } from '@/features/store';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { Cross } from '@/shared/icons';
import AvatarProfileItem from '@/entities/store/ui/AvatarProfileItem';

const PersonalizationAvatar = () => {
    const queryClient = useQueryClient();
    const { getPaginationProfileAvatars, applyProduct } = useAvatar();

    const revalidateAvatars = () => {
        queryClient.invalidateQueries({ queryKey: ['profile_avatars'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['profile_avatars'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['profile_avatars'],
        queryFn: getPaginationProfileAvatars,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <>
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
                            <AvatarProfileItem
                                key={data.id}
                                data={data}
                                useProduct={() => applyProduct(data.id, revalidateAvatars)}
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
        </>
    );
};

export default PersonalizationAvatar;
