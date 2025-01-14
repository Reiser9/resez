'use client';

import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

type Props<T> = {
    queryKey: (string | null)[];
    queryFn: (page: number) => Promise<T>;
    getNextPageParam?: (lastPage: T, allPages: T[]) => any;
    rootMargin?: string;
    threshold?: number;
    refetchInterval?: number;
    enabled?: boolean;
};

const useInfiniteScroll = <T,>({
    queryKey,
    queryFn,
    getNextPageParam,
    rootMargin = '300px',
    threshold = 1.0,
    refetchInterval,
    enabled,
}: Props<T>) => {
    const endPage = React.useRef<HTMLDivElement>(null);

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: (page) => queryFn(page.pageParam),
        initialPageParam: 0,
        getNextPageParam: getNextPageParam
            ? getNextPageParam
            : (lastPage, allPages) => {
                  if (!lastPage || typeof lastPage !== 'object' || !('isLast' in lastPage)) return;

                  const nextPage = !lastPage?.isLast ? allPages?.length : undefined;

                  return nextPage;
              },
        ...(refetchInterval && { refetchInterval }),
        ...(enabled && { enabled }),
    });

    React.useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: rootMargin,
                threshold: threshold,
            },
        );

        const currentEndPage = endPage.current;

        if (currentEndPage) {
            observer.observe(currentEndPage);
        }

        return () => {
            if (currentEndPage) {
                observer.unobserve(currentEndPage);
            }
        };
    }, [hasNextPage, isPending, isError, isFetchingNextPage, fetchNextPage, rootMargin, threshold]);

    return { data, isPending, isError, endPage, isFetchingNextPage };
};

export default useInfiniteScroll;
