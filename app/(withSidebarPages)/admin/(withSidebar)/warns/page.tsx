'use client';

import React from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { CollectionItemSkeleton } from '@/shared/ui/Skeleton';
import useWarn from '@/features/admin/warns/useWarn';
import WarnItem from '@/entities/admin/ui/WarnItem';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

const AdminWarns = () => {
    const queryClient = useQueryClient();
    const { getPagginationWarns, readWarn } = useWarn();

    const revalidateWarns = () => {
        queryClient.invalidateQueries({ queryKey: ['warns'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['warns'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['warns'],
        queryFn: (param) => getPagginationWarns(param.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.COMPLAINTS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Жалобы{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
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
                ) : data.pages[0]?.totalCount ? (
                    <div className={base.contentItems}>
                        {data?.pages.map((role) =>
                            role?.feedback?.map((data) => (
                                <WarnItem
                                    key={data.id}
                                    data={data}
                                    readWarnCallback={() => readWarn(data.id, revalidateWarns)}
                                />
                            )),
                        )}
                    </div>
                ) : (
                    <NotContent text="Жалоб не найдено" />
                )}

                {!isError && hasNextPage && (
                    <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                        Показать еще
                    </Button>
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminWarns;
