'use client';

import React from 'react';
import Image from 'next/image';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import Tabs from './ui/Tabs';
import { CollectionItem } from '@/entities/collection/ui';
import { ArrowRight, Cross } from '@/shared/icons';
import { useCollections } from '@/features/collection';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';

const Memory = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const queryClient = useQueryClient();
    const { collectionsIsLoading, getPaginationCollections, deleteCollectionById, getPopularCollections } =
        useCollections();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['collections'] });
    };

    const refetchPopular = () => {
        queryClient.resetQueries({ queryKey: ['collections_popular'] });
    };

    const { data, isPending, isError } = useInfiniteQuery({
        queryKey: ['collections'],
        queryFn: (param) => getPaginationCollections(param.pageParam, ''),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: isAuth,
    });

    const {
        data: popularCollections,
        isPending: popularCollectionsIsLoading,
        isError: popularCollectionsError,
    } = useQuery({
        queryKey: ['collections_popular'],
        queryFn: getPopularCollections,
    });

    const deleteCollectionHandler = (id: string) => {
        deleteCollectionById(id, revalidateRequest);
    };

    return (
        <div className={base.baseWrapperGap16}>
            <Tabs />

            <div className={styles.subscribeBanner}>
                <div className={styles.subscribeContent}>
                    <Text variant="h3">Разблокируйте все возможности с ResEz Premium</Text>

                    <Text variant="text2" fontWeight={600}>
                        Никаких ограничений и спокойная подготовка, именно это получите вы вместе с Resez Premium
                    </Text>

                    <Button auto href="/store/subscription" variant="light">
                        Подробнее
                    </Button>
                </div>

                <div className={styles.subscribeFoxInner}>
                    <Image src="/img/fox.svg" alt="Fox" fill />
                </div>
            </div>

            <div className={base.baseWrapperGap8}>
                <div className={base.titleInner}>
                    <Text variant="h3">Популярные</Text>

                    <ReloadButton onClick={refetchPopular} disabled={popularCollectionsIsLoading} />
                </div>

                {popularCollectionsIsLoading ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <CollectionItemSkeleton key={id} />
                        ))}
                    </div>
                ) : popularCollectionsError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : !popularCollections?.length ? (
                    <NotContent text="Коллекций не найдено" />
                ) : (
                    <div className={base.contentItems}>
                        {popularCollections?.map((data) => (
                            <CollectionItem
                                key={data.id}
                                data={data}
                                loading={collectionsIsLoading.includes(String(data.id))}
                                deleteCallback={() => deleteCollectionHandler(String(data.id))}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className={base.baseWrapperGap8}>
                <div className={base.titleInner}>
                    <Text variant="h3">Ваши коллекции</Text>

                    <IconButton href="/training/memory/my" small variant="light" circle>
                        <ArrowRight />
                    </IconButton>
                </div>

                {isAuth ? (
                    isPending ? (
                        <div className={base.contentItems}>
                            {[...Array(3)].map((_, id) => (
                                <CollectionItemSkeleton key={id} />
                            ))}
                        </div>
                    ) : isError ? (
                        <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                    ) : data?.pages[0]?.totalCount === 0 ? (
                        <NotContent text="Коллекций не найдено">
                            <Button href="/training/memory/create" variant="light" auto>
                                Создать коллекцию
                            </Button>
                        </NotContent>
                    ) : (
                        <div className={base.contentItems}>
                            {data?.pages[0]?.collections?.slice(0, 3).map((data) => (
                                <CollectionItem
                                    key={data.id}
                                    data={data}
                                    loading={collectionsIsLoading.includes(String(data.id))}
                                    deleteCallback={() => deleteCollectionHandler(String(data.id))}
                                />
                            ))}
                        </div>
                    )
                ) : (
                    <NotContent text="Требуется авторизация">
                        <Button href="/login" variant="light" auto>
                            Авторизоваться
                        </Button>
                    </NotContent>
                )}
            </div>
        </div>
    );
};

export default Memory;
