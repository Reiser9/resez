'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { AvatarProfileItem } from '@/entities/store/ui';
import { useAvatar } from '@/features/store';
import { Cross } from '@/shared/icons';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';

const PersonalizationAvatar = () => {
    const queryClient = useQueryClient();
    const { getPaginationProfileAvatars, applyAvatarDecoration, resetAvatarDecoration } = useAvatar();

    const revalidateAvatars = () => {
        queryClient.invalidateQueries({ queryKey: ['profile_avatars'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['profile_avatars'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['profile_avatars'],
        queryFn: (pageParam) => getPaginationProfileAvatars(pageParam),
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
            ) : data?.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((avatar) =>
                            avatar?.products?.map((data) => (
                                <AvatarProfileItem
                                    key={data.id}
                                    data={data}
                                    useProduct={() => applyAvatarDecoration(data.id, revalidateAvatars)}
                                    resetProduct={() => resetAvatarDecoration(revalidateAvatars)}
                                />
                            )),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Украшений аватарок не найдено">
                    <Button href="/store/personalization/avatar" variant="light" auto>
                        В магазин
                    </Button>
                </NotContent>
            )}
        </>
    );
};

export default PersonalizationAvatar;
