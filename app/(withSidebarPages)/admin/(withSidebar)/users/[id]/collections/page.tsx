'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Reload } from '@/shared/icons';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { useUsers } from '@/features/user';
import { CollectionItem } from '@/entities/collection/ui';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';
import { IconButton } from '@/shared/ui/Button';

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

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['user_collections_by_id', String(id)],
        queryFn: (pageParam) => getUserCollections(pageParam, String(id)),
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
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((collection) =>
                            collection?.collections?.map((data) => <CollectionItem key={data.id} data={data} />),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Коллекций не найдено" />
            )}
        </div>
    );
};

export default AdminUserByIdCollections;
