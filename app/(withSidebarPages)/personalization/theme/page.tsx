'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { AvatarProfileItem, ThemeProfileItem } from '@/entities/store/ui';
import { useAvatar, useTheme } from '@/features/store';
import { Cross } from '@/shared/icons';

import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';

const PersonalizationTheme = () => {
    const queryClient = useQueryClient();
    const { getPaginationProfileThemes, applyTheme, resetTheme } = useTheme();

    const revalidateThemes = () => {
        queryClient.invalidateQueries({ queryKey: ['profile_theme'] });
        queryClient.invalidateQueries({ queryKey: ['short_info'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['profile_theme'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['profile_theme'],
        queryFn: getPaginationProfileThemes,
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
                    {data?.pages.map((theme) =>
                        theme?.products?.map((data) => (
                            <ThemeProfileItem
                                key={data.id}
                                data={data}
                                useProduct={() => applyTheme(data.id, revalidateThemes)}
                                resetProduct={() => resetTheme(revalidateThemes)}
                            />
                        )),
                    )}
                </div>
            ) : (
                <NotContent text="Тем не найдено" />
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </>
    );
};

export default PersonalizationTheme;
