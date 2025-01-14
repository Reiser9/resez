'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { ThemeProfileItem } from '@/entities/store/ui';
import { useTheme } from '@/features/store';
import { Cross } from '@/shared/icons';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';

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

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['profile_theme'],
        queryFn: (pageParam) => getPaginationProfileThemes(pageParam),
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

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Тем не найдено">
                    <Button href="/store/personalization/theme" variant="light">
                        В магазин
                    </Button>
                </NotContent>
            )}
        </>
    );
};

export default PersonalizationTheme;
