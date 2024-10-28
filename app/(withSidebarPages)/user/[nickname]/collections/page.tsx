'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { useCollections } from '@/features/collection';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { CollectionItem } from '@/entities/collection/ui';

import { NotContent } from '@/shared/ui/NotContent';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { SearchInput } from '@/shared/ui/Input';

const UserCollections = () => {
    const { nickname } = useParams();

    const [searchValue, setSearchValue] = React.useState('');
    const debounceSearch = useDebounce(searchValue, 500);

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getUserCollectionsByNickname, deleteCollectionById } = useCollections();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['user_collection'] });
    };

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['user_collection'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['user_collection', nickname, debounceSearch],
        queryFn: (page) => getUserCollectionsByNickname(page.pageParam, String(nickname), debounceSearch),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!nickname,
    });

    const deleteCollectionHandler = (id: string) => {
        deleteCollectionById(id, revalidateRequest);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <SearchInput value={searchValue} setValue={setSearchValue} />

            <div className={base.titleInner}>
                <Text variant="h3">
                    Коллекции{' '}
                    {!isPending && !isError && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                </Text>

                <ReloadButton onClick={resetRequest} disabled={isPending} />
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(3)].map((_, id) => (
                        <CollectionItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount === 0 ? (
                searchValue ? (
                    <NotContent text="Коллекций не найдено" />
                ) : (
                    <NotContent text="Пользователь не создал ни одной коллекции" />
                )
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

            {!isError && hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default UserCollections;
