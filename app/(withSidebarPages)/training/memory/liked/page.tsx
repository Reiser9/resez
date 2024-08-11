'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Heart } from '@/shared/icons';
import { CollectionItem } from '@/shared/ui/CollectionItem';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { useCollections } from '@/features/collection';
import Tabs from '../ui/Tabs';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { SearchInput } from '@/shared/ui/SearchInput';

const MemoryLiked = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const [searchValue, setSearchValue] = React.useState('');
    const debounceTimeout = useDebounce(searchValue, 500);

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getLikedPaginationCollections, deleteCollectionById } = useCollections();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['collections_liked'] });
    };

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['collections_liked'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['collections_liked'],
        queryFn: (page) => getLikedPaginationCollections(page.pageParam, searchValue),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: isAuth,
    });

    const deleteCollectionHandler = (id: string) => {
        deleteCollectionById(id, revalidateRequest);
    };

    React.useEffect(() => {
        if (!isAuth) {
            return;
        }

        refetch();
    }, [debounceTimeout, isAuth]);

    return (
        <div className={base.baseWrapperGap16}>
            <Tabs />

            {isAuth ? (
                <>
                    <SearchInput value={searchValue} setValue={setSearchValue} />

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
                            <NotContent text="По вашему запросу коллекций не найдено" />
                        ) : (
                            <NotContent text="Вы еще не лайкнули не одну коллекцию" icon={<Heart />} />
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
                        <Button
                            auto
                            onClick={fetchNextPage}
                            loading={isFetchingNextPage}
                            className={base.buttonShowMore}
                        >
                            Показать еще
                        </Button>
                    )}
                </>
            ) : (
                <NotContent text="Требуется авторизация">
                    <Button href="/login" variant="light" auto>
                        Авторизоваться
                    </Button>
                </NotContent>
            )}
        </div>
    );
};

export default MemoryLiked;
