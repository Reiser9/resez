'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import { Cross, Plus, Tests } from '@/shared/icons';
import CatalogItem from './CatalogItem';
import { useTest } from '@/features/test';
import { TestItem } from '@/entities/test/ui';
import { CatalogItemSkeleton, TestItemSkeleton } from '@/shared/ui/Skeleton';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useSubjects } from '@/features/subjects';
import { useUserPermissions } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';

const TestsSubject = () => {
    const { subject } = useParams();
    const { getUserPermissions } = useUserPermissions();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { data: permissions } = useQuery({
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
                <div className={base.titleInner} style={{ minHeight: 38 }}>
                    <Text variant="h4">
                        Варианты от ResEz{' '}
                        {!isError && !isPending && !!data?.pages[0]?.totalCount && `(${data?.pages[0].totalCount})`}
                    </Text>

                    <div className={base.titleWrapper}>
                        {checkPermission(permissions || [], [PERMISSIONS.CREATE_OFFICIAL_TESTS]) && (
                            <Tooltip destroyTooltipOnHide title="Создать">
                                <IconButton circle small variant="light" href="/admin/tests/create">
                                    <Plus />
                                </IconButton>
                            </Tooltip>
                        )}

                        {Number(data?.pages[0]?.totalCount) > 3 && (
                            <Button auto small variant="light" href={`/tests/subject/${subject}/recommended`}>
                                Смотреть все
                            </Button>
                        )}
                    </div>
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
                            {data?.pages[0].tests.slice(0, 3).map((data) => (
                                <TestItem
                                    key={data.id}
                                    data={data}
                                    remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                    removeCallback={() => deleteTest(data.id, revalidateTests)}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotContent text="Вариантов не найдено" icon={<Tests />} />
                    )}
                </div>
            </div>

            <div className={base.baseWrapperGap12}>
                <Text variant="h4">Каталог заданий {!!taskCatalog?.tasksCount && `(${taskCatalog?.tasksCount})`}</Text>

                <div className={base.contentItems}>
                    {taskCatalogIsLoading ? (
                        [...Array(4)].map((_, id) => <CatalogItemSkeleton key={id} />)
                    ) : taskCatalogError ? (
                        <NotContent text="Ошибка при загрузке заданий" danger icon={<Cross />} />
                    ) : !!taskCatalog?.subjectTasks.length ? (
                        taskCatalog.subjectTasks.map((data) => <CatalogItem key={data.id} data={data} />)
                    ) : (
                        <NotContent text="Заданий не найдено" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestsSubject;
