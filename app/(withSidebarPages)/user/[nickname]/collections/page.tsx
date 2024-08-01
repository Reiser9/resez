'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Heart } from '@/shared/icons';
import { CollectionItem } from '@/shared/ui/CollectionItem';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { useCollections } from '@/features/collection';

const UserCollections = () => {
    const { nickname } = useParams();

    const [searchValue, setSearchValue] = React.useState('');

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getLikedPaginationCollections, deleteCollectionById } = useCollections();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['collections_liked'] });
    };

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['collections_liked'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['collections_liked'],
        queryFn: (page) => getLikedPaginationCollections(page, searchValue),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    const deleteCollectionHandler = (id: string) => {
        deleteCollectionById(id, revalidateRequest);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">
                    Коллекции{' '}
                    {!isPending && !error && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
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
                <NotContent text="Пользователь не создал ни одной коллекции" icon={<Heart />} />
            ) : (
                <div className={base.contentItems}>
                    {data?.pages.map((collection) =>
                        collection?.collections?.map((data) => (
                            <CollectionItem
                                key={data.id}
                                data={data}
                                loading={collectionsIsLoading.includes(String(data.id))}
                                deleteCallback={() => deleteCollectionHandler(String(data.id))}
                            />
                        )),
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

export default UserCollections;
