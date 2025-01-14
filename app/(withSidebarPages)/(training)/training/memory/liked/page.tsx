'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Heart } from '@/shared/icons';
import { useCollections } from '@/features/collection';
import Tabs from '../ui/Tabs';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { CollectionItem } from '@/entities/collection/ui';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { SearchInput } from '@/shared/ui/Input';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';

const MemoryLiked = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const [searchValue, setSearchValue] = React.useState('');
    const debounceSearch = useDebounce(searchValue, 500);

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getLikedPaginationCollections, deleteCollectionById } = useCollections();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['collections_liked'] });
    };

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['collections_liked'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['collections_liked', debounceSearch],
        queryFn: (pageParam) => getLikedPaginationCollections(pageParam, debounceSearch),
        enabled: isAuth,
    });

    const deleteCollectionHandler = (id: string) => {
        deleteCollectionById(id, revalidateRequest);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <Tabs />

            {isAuth ? (
                <>
                    <SearchInput value={searchValue} setValue={setSearchValue} />

                    <div className={base.titleInner}>
                        <Text variant="h3">
                            Коллекции{' '}
                            {!isPending &&
                                !isError &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
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
                    ) : data?.pages[0]?.totalCount ? (
                        <div className={cn(base.baseWrapperGap16, base.aic)}>
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

                            {isFetchingNextPage && <Preloader offIndent small page />}

                            {!isFetchingNextPage && <div ref={endPage}></div>}
                        </div>
                    ) : debounceSearch ? (
                        <NotContent text="По вашему запросу коллекций не найдено" />
                    ) : (
                        <NotContent text="Вы еще не лайкнули не одну коллекцию" icon={<Heart />} />
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
