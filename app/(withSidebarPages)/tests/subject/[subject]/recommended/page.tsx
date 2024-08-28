'use client';

import React from 'react';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import TestItem from '@/entities/test/ui/TestItem';
import { Cross, Tests } from '@/shared/icons';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useTest } from '@/features/test';
import { useUserPermissions } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { TestItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';

const RecommendedSubjectTests = () => {
    const { subject } = useParams();
    const { getUserPermissions } = useUserPermissions();
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getPagginationOfficialTests, deleteTest } = useTest();

    const queryClient = useQueryClient();

    const revalidateTests = () => {
        queryClient.invalidateQueries({ queryKey: ['official_tests_by_subject'] });
    };

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        error: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['official_tests_by_subject'],
        queryFn: (params) => getPagginationOfficialTests(params.pageParam, String(subject)),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!subject,
    });

    return (
        <div className={base.baseWrapperGap12}>
            <div className={base.titleInner} style={{ minHeight: 38 }}>
                <Text variant="h4">
                    Варианты от ResEz{' '}
                    {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                </Text>
            </div>

            <div className={base.contentItems}>
                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <TestItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={base.contentItems}>
                        {data?.pages.map((avatar) =>
                            avatar?.tests.map((data) => (
                                <TestItem
                                    key={data.id}
                                    data={data}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                    removeCallback={() => deleteTest(data.id, revalidateTests)}
                                />
                            )),
                        )}
                    </div>
                ) : (
                    <NotContent text="Вариантов не найдено" icon={<Tests />} />
                )}
            </div>

            {hasNextPage && (
                <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                    Показать еще
                </Button>
            )}
        </div>
    );
};

export default RecommendedSubjectTests;
