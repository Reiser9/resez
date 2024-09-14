'use client';

import React from 'react';
import cn from 'classnames';
import { Tooltip } from 'antd';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { Cross, Plus } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useTest } from '@/features/test';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { useUserPermissions } from '@/features/user';
import { TestItem } from '@/entities/test/ui';

import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { TestItemSkeleton } from '@/shared/ui/Skeleton';

const AdminTests = () => {
    const { getUserPermissions } = useUserPermissions();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const queryClient = useQueryClient();
    const { getPagginationTests, deleteTest } = useTest();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['tests'] });
    };

    const resetRequest = () => {
        queryClient.resetQueries({ queryKey: ['tests'] });
    };

    const { data, isPending, isError, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['tests'],
        queryFn: (params) => getPagginationTests(params.pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
    });

    return (
        <PrivateWrapper permissions={[PERMISSIONS.TESTS]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <div className={base.titleWrapper}>
                        <Text variant="h3">
                            Тесты{' '}
                            {!isError &&
                                !isPending &&
                                !!data?.pages[0]?.totalCount &&
                                `(${data?.pages[0]?.totalCount})`}
                        </Text>

                        <ReloadButton onClick={resetRequest} disabled={isPending} />
                    </div>

                    {checkPermission(permissions || [], [PERMISSIONS.CREATE_OFFICIAL_TESTS]) && (
                        <Tooltip title="Создать">
                            <IconButton small variant="light" href="/admin/tests/create" circle>
                                <Plus />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>

                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <TestItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Ошибка при загрузке тестов" icon={<Cross />} danger />
                ) : data.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={base.contentItems}>
                            {data?.pages.map((test) =>
                                test?.tests.map((data) => (
                                    <TestItem
                                        key={data.id}
                                        data={data}
                                        // loading={subjectIsLoading.includes(data.id)}
                                        // edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                        remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                        removeCallback={() => deleteTest(data.id, revalidateRequest)}
                                    />
                                )),
                            )}
                        </div>

                        {hasNextPage && (
                            <Button
                                auto
                                onClick={fetchNextPage}
                                loading={isFetchingNextPage}
                                className={base.buttonShowMore}
                            >
                                Показать еще
                            </Button>
                        )}
                    </div>
                ) : (
                    <NotContent text="Тестов не найдено" />
                )}
            </div>
        </PrivateWrapper>
    );
};

export default AdminTests;
