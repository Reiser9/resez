'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Search } from '@/shared/icons';
import { CollectionItem } from '@/shared/ui/CollectionItem';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { useCollections } from '@/features/collection';
import { Input } from '@/shared/ui/Input';

const UserCollections = () => {
    const { nickname } = useParams();

    const [searchValue, setSearchValue] = React.useState('');
    const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getUserCollectionsByNickname, deleteCollectionById } = useCollections();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['user_collection'] });
    };

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['user_collection'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['user_collection', nickname],
        queryFn: (page) => getUserCollectionsByNickname(page.pageParam, String(nickname), searchValue),
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

    React.useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            refetch();
        }, 500);

        return () => {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }
        };
    }, [searchValue]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.searchInner}>
                <Input
                    placeholder="Искать"
                    className={base.searchInput}
                    value={searchValue}
                    setValue={setSearchValue}
                />

                <Search className={base.searchIcon} />
            </div>

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

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default UserCollections;
