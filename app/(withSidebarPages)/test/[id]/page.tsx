'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';
import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { useTest } from '@/features/test';
import { Cross } from '@/shared/icons';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { TestQuestionItem } from '@/entities/test/ui';
import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { useUserPermissions } from '@/features/user';
import { useTask } from '@/features/task';
import TestInfo from '../ui/TestInfo';

import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';
import { Modal } from '@/shared/ui/Modal';
import { Preloader } from '@/shared/ui/Preloader';
import { Button } from '@/shared/ui/Button';
import { TaskItem } from '@/entities/task/ui';

const TestPage = () => {
    const { getUserPermissions } = useUserPermissions();
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    const [subjectTaskId, setSubjectTaskId] = React.useState<number | null>(null);
    const [currentTaskId, setCurrentTaskId] = React.useState<number | null>(null);

    const [swapModal, setSwapModal] = React.useState(false);

    const { id } = useParams();

    const { getTestById, swapTask } = useTest();
    const { getPagginationTasks, archiveTask, toggleVerify } = useTask();
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({
            queryKey: ['admin_tasks', subjectTaskId, currentTaskId],
        });
    };

    const revalidateTest = () => {
        queryClient.invalidateQueries({
            queryKey: ['test_by_id', id],
        });
    };

    const {
        data: test,
        isLoading: testIsLoading,
        isError,
    } = useQuery({
        queryKey: ['test_by_id', id],
        queryFn: () => getTestById(String(id)),
        enabled: !!id,
    });

    const {
        data,
        isPending,
        isError: adminTasksError,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['admin_tasks', subjectTaskId, currentTaskId],
        queryFn: (pageParam) =>
            getPagginationTasks(pageParam.pageParam, '', subjectTaskId || '', '', '', '', 9, currentTaskId || ''),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages?.length : undefined;

            return nextPage;
        },
        enabled: !!subjectTaskId && !!currentTaskId,
    });

    const { tasksCount, tasks } = test || {};

    const swapCallback = (subjectTaskId: number, currentTaskId: number) => {
        setSubjectTaskId(subjectTaskId);
        setCurrentTaskId(currentTaskId);
        setSwapModal(true);
    };

    const toggleVerifyMutation = useMutation({
        mutationFn: async (id: number) => {
            await toggleVerify(id, revalidateRequest);
        },
    });

    const swapTaskMutation = useMutation({
        mutationFn: async (newTaskId: number) => {
            if (!currentTaskId) return;

            await swapTask(String(id), currentTaskId, newTaskId, () => {
                revalidateRequest();
                revalidateTest();
                setSubjectTaskId(null);
                setCurrentTaskId(null);
                setSwapModal(false);
            });
        },
    });

    if (testIsLoading) {
        return <Preloader page />;
    }

    if (isError) {
        return <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />;
    }

    return (
        <>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.contentFull}>
                        <div className={base.baseWrapperGap40}>
                            {!!test && <TestInfo data={test} />}

                            <div className={base.baseWrapperGap12}>
                                <Text variant="h4">Задания ({tasksCount})</Text>

                                {!!tasks?.length ? (
                                    <div className={base.contentItems}>
                                        {tasks?.map((data) => (
                                            <TestQuestionItem
                                                key={data.id}
                                                data={data}
                                                edit={checkPermission(permissions || [], [PERMISSIONS.TESTS])}
                                                swapCallback={() => swapCallback(data.subjectTask.id, data.id)}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <NotContent text="Заданий не найдено" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ContentWrapper>

            {checkPermission(permissions || [], [PERMISSIONS.TESTS]) && (
                <Modal title="Заменить задание" value={swapModal} setValue={setSwapModal}>
                    {isPending ? (
                        <Preloader small page />
                    ) : adminTasksError ? (
                        <NotContent icon={<Cross />} danger text="Произошла ошибка при загрузке данных" />
                    ) : data?.pages[0]?.totalCount ? (
                        <div className={cn(base.baseWrapperGap16, base.aic)}>
                            <div className={base.contentItems}>
                                {data?.pages.map((task) =>
                                    task?.tasks.map((data) => (
                                        <TaskItem
                                            key={data.id}
                                            data={data}
                                            href={`/admin/task/${data.id}`}
                                            edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_TASKS])}
                                            remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_TASKS])}
                                            verify={checkPermission(permissions || [], [PERMISSIONS.VERIFY_TASKS])}
                                            swap={checkPermission(permissions || [], [PERMISSIONS.TESTS])}
                                            archiveCallback={() => archiveTask(data.id, revalidateRequest)}
                                            toggleVerify={() => toggleVerifyMutation.mutate(data.id)}
                                            swapCallback={() => swapTaskMutation.mutate(data.id)}
                                        />
                                    )),
                                )}
                            </div>

                            {!adminTasksError && hasNextPage && (
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
                        <NotContent text="Заданий не найдено" />
                    )}
                </Modal>
            )}
        </>
    );
};

export default TestPage;
