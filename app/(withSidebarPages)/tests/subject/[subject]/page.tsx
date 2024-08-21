'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { NotContent } from '@/shared/ui/NotContent';
import { Cross, Tests } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import CatalogItem from './CatalogItem';
import { useTest } from '@/features/test';
import TestItem from '@/entities/test/ui/TestItem';
import { CatalogItemSkeleton, TestItemSkeleton } from '@/shared/ui/Skeleton';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useSubjects } from '@/features/subjects';
import { useUserPermissions } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

const TestsSubject = () => {
    const { subject } = useParams();
    const { getUserPermissions } = useUserPermissions();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        error: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    const { getPagginationOfficialTests, deleteTest } = useTest();
    const { getTasksCatalogBySubject } = useSubjects();

    const queryClient = useQueryClient();

    const revalidateTests = () => {
        queryClient.invalidateQueries({ queryKey: ['official_tests_by_subject'] });
    };

    const { data, isPending, isError } = useInfiniteQuery({
        queryKey: ['official_tests_by_subject'],
        queryFn: (params) => getPagginationOfficialTests(params.pageParam, String(subject)),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!subject,
    });

    const {
        data: taskCatalog,
        isPending: taskCatalogIsLoading,
        isError: taskCatalogError,
    } = useQuery({
        queryKey: ['tasks_catalog_by_subject'],
        queryFn: () => getTasksCatalogBySubject(String(subject)),
        enabled: !!subject,
    });

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.baseWrapperGap12}>
                <div className={base.titleInner}>
                    <Text variant="h4">Варианты от ResEz</Text>

                    {Number(data?.pages[0]?.totalCount) > 3 && (
                        <Button auto small variant="light" href={`/tests/recommended/${subject}`}>
                            Смотреть все
                        </Button>
                    )}
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
                                avatar?.tests
                                    ?.slice(0, 3)
                                    .map((data) => (
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
            </div>

            <div className={base.baseWrapperGap12}>
                <Text variant="h4">Каталог заданий</Text>

                <div className={base.contentItems}>
                    {taskCatalogIsLoading ? (
                        [...Array(4)].map((_, id) => <CatalogItemSkeleton key={id} />)
                    ) : taskCatalogError ? (
                        <NotContent text="Ошибка при загрузке тестов" danger icon={<Cross />} />
                    ) : !!taskCatalog?.length ? (
                        taskCatalog.map((data) => <CatalogItem key={data.id} data={data} />)
                    ) : (
                        <NotContent text="Заданий не найдено" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestsSubject;
