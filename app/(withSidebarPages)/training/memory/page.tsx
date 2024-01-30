'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { CollectionItem } from '@/shared/ui/CollectionItem';
import useCollections from '@/features/collection/useCollections';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';

const Memo = () => {
    const queryClient = useQueryClient();
    const { getPaginationCollections } = useCollections();

    const revalidateRoles = () => {
        queryClient.invalidateQueries({ queryKey: ['collections'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['collections'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['collections'],
        queryFn: getPaginationCollections,
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
                        Коллекции {(!isPending && data?.pages[0]?.totalCount !== 0) && `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                <Button href="memory/create" variant="light" auto>
                    Создать
                </Button>
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <CollectionItemSkeleton key={id} />
                    ))}
                </div>
            ) : error ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount === 0 ? (
                <NotContent text="Коллекций не найдено" />
            ) : (
                <div className={base.contentItems}>
                    {data?.pages.map((collection) =>
                        collection?.collections?.map((data) => <CollectionItem key={data.id} data={data} />),
                    )}
                </div>
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default Memo;
