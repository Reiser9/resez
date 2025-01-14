'use client';

import React from 'react';
import cn from 'classnames';
import { useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Filter } from '@/shared/icons';
import { useTest } from '@/features/test';
import { TestHistoryItem } from '@/entities/test/ui';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { TestHistoryItemSkeleton } from '@/shared/ui/Skeleton';
import { Preloader } from '@/shared/ui/Preloader';

const TestsHistory = () => {
    const [testHistoryFilters, setTestHistoryFilters] = React.useState(false);
    const { getPagginationTestsHistory } = useTest();

    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['test_history'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['test_history'] });
    };

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['test_history'],
        queryFn: (pageParam) => getPagginationTestsHistory(pageParam),
    });

    return (
        <>
            <div className={base.titleInner}>
                <Text variant="h3">
                    История решений{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                </Text>

                {/* <IconButton small variant="light" onClick={() => setTestHistoryFilters(true)}>
                    <Filter />
                </IconButton> */}
            </div>

            {isPending ? (
                <div className={base.contentItems}>
                    {[...Array(4)].map((_, id) => (
                        <TestHistoryItemSkeleton key={id} />
                    ))}
                </div>
            ) : isError ? (
                <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
            ) : data?.pages[0]?.totalCount ? (
                <div className={cn(base.baseWrapperGap16, base.aic)}>
                    <div className={base.contentItems}>
                        {data?.pages.map((history) =>
                            history?.history?.map((data) => <TestHistoryItem key={data.id} data={data} />),
                        )}
                    </div>

                    {isFetchingNextPage && <Preloader offIndent small page />}

                    {!isFetchingNextPage && <div ref={endPage}></div>}
                </div>
            ) : (
                <NotContent text="Вы еще не решили ни одного теста">
                    <Button href="/tests/subject" variant="light" auto>
                        Решать тесты
                    </Button>
                </NotContent>
            )}
        </>
    );
};

export default TestsHistory;
