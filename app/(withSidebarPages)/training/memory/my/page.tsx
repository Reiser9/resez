'use client';

import React from 'react';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import styles from '../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Plus, Search } from '@/shared/icons';
import { CollectionItem } from '@/shared/ui/CollectionItem';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { useCollections } from '@/features/collection';
import { Input } from '@/shared/ui/Input';
import Tabs from '../ui/Tabs';

const MemoryMy = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null);

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getPaginationCollections, deleteCollectionById } = useCollections();

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['collections'] });
    };

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['collections'] });
    };

    const { data, isPending, error, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['collections'],
        queryFn: (page) => getPaginationCollections(page, searchValue),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
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
            <Tabs />

            <div className={styles.searchInner}>
                <Input
                    placeholder="Искать"
                    className={styles.searchInput}
                    value={searchValue}
                    setValue={setSearchValue}
                />

                <Search className={styles.searchIcon} />
            </div>

            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">
                        Коллекции{' '}
                        {!isPending && !error && !!data?.pages[0]?.totalCount && `(${data?.pages[0]?.totalCount})`}
                    </Text>

                    <ReloadButton onClick={resetRequest} disabled={isPending} />
                </div>

                <Tooltip title="Создать">
                    <IconButton href="/training/memory/create" variant="light" small circle>
                        <Plus />
                    </IconButton>
                </Tooltip>
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
                <NotContent text="Коллекций не найдено">
                    <Button href="/training/memory/create" variant="light" auto>
                        Создать коллекцию
                    </Button>
                </NotContent>
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

export default MemoryMy;
