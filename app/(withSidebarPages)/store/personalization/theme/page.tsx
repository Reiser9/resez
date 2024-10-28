'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { useTheme } from '@/features/store';
import { Cross } from '@/shared/icons';
import { ThemeStoreItem } from '@/entities/store/ui';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { AvatarItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const StorePersonalizationAvatar = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const queryClient = useQueryClient();
    const router = useRouter();
    const { getPaginationStoreThemes, addThemeToProfile } = useTheme();

    const revalidateThemes = () => {
        queryClient.invalidateQueries({ queryKey: ['store_themes'] });
        queryClient.invalidateQueries({ queryKey: ['short_info'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['store_themes'] });
    };

    const addProductToProfileHandler = (id: number) => {
        if (!isAuth) {
            return router.push('/login');
        }

        addThemeToProfile(id, revalidateThemes);
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['store_themes'],
        queryFn: getPaginationStoreThemes,
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
                    Темы {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
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
                    {data?.pages.map((theme) =>
                        theme?.products?.map((data) => (
                            <ThemeStoreItem
                                key={data.id}
                                data={data}
                                addProductToProfile={() => addProductToProfileHandler(data.id)}
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

export default StorePersonalizationAvatar;
