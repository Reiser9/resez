'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Reload } from '@/shared/icons';

import { Button, IconButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { useUsers } from '@/features/user';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { CollectionItem } from '@/entities/collection/ui';

const AdminUserByIdCollections = () => {
    const { getUserCollections } = useUsers();

    const queryClient = useQueryClient();
    const { id } = useParams();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['user_collections_by_id', id] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['user_collections_by_id', id] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['user_collections_by_id', id],
        queryFn: (param) => getUserCollections(param.pageParam, String(id)),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!id,
    });

    return (
        <div className={base.baseWrapperGap8}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Коллекции{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount + 1})`}
                </Text>

                <IconButton circle small onClick={resetRequest} disabled={isPending}>
                    <Reload />
                </IconButton>
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <CollectionItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount ? (
                <div className={base.contentItems}>
                    {data?.pages.map((collection) =>
                        collection?.collections?.map((data) => <CollectionItem key={data.id} data={data} />),
                    )}
                </div>
            ) : (
                <NotContent text="Коллекций не найдено" />
            )}

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default AdminUserByIdCollections;
