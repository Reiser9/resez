'use client';

import React from 'react';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from '../../[id]/index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { useTask } from '@/features/task';
import { TaskTestItem } from '@/entities/task/ui';
import { Cross } from '@/shared/icons';
import { checkPermission } from '@/shared/utils/checkPermissions';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { useUserPermissions } from '@/features/user';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

import { InfoSidebar } from '@/shared/ui/InfoSidebar';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { TextPoint } from '@/shared/ui/TextPoint';
import { TaskItemSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';

const TaskSubThemePage = () => {
    const { id } = useParams();

    const [infoMenu, setInfoMenu] = React.useState(false);

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getTasksBySubThemeId, getSubThemeInfo } = useTask();
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    const { data, endPage, isPending, isError, isFetchingNextPage } = useInfiniteScroll({
        queryKey: ['task_by_subtheme_id', String(id)],
        queryFn: (pageParam) => getTasksBySubThemeId(pageParam, String(id)),
        enabled: !!id,
    });

    const {
        data: subthemeInfo,
        isLoading: subthemeInfoIsLoading,
        isError: subthemeInfoError,
    } = useQuery({
        queryKey: ['subtheme_info_by_id', id],
        queryFn: () => getSubThemeInfo(String(id)),
        enabled: !!id,
    });

    const { number, subTheme, subject, theme } = subthemeInfo || {};

    return (
        <div className={styles.taskInner}>
            <div className={base.taskContent}>
                {isPending ? (
                    <div className={base.contentItems}>
                        {[...Array(4)].map((_, id) => (
                            <TaskItemSkeleton key={id} />
                        ))}
                    </div>
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.pages[0]?.totalCount ? (
                    <div className={cn(base.baseWrapperGap16, base.aic)}>
                        <div className={styles.tasksContent}>
                            {data?.pages.map((task) =>
                                task?.tasks.map((data) => (
                                    <TaskTestItem
                                        key={data.id}
                                        data={data}
                                        taskWithLink
                                        edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_TASKS])}
                                        remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_TASKS])}
                                        verify={checkPermission(permissions || [], [PERMISSIONS.VERIFY_TASKS])}
                                    />
                                )),
                            )}
                        </div>

                        {isFetchingNextPage && <Preloader offIndent small page />}

                        {!isFetchingNextPage && <div ref={endPage}></div>}
                    </div>
                ) : (
                    <NotContent text="Заданий не найдено" />
                )}
            </div>

            <InfoSidebar value={infoMenu} setValue={setInfoMenu}>
                {subthemeInfoIsLoading ? (
                    <Preloader small page />
                ) : subthemeInfoError ? (
                    <NotContent text="Ошибка при загрузке данных" icon={<Cross />} danger />
                ) : (
                    <>
                        <TextPoint title="Предмет:">
                            <Text variant="h4">{subject || '-'}</Text>
                        </TextPoint>

                        <TextPoint title="Номер задания:">
                            <Text variant="h4">{number || '-'}</Text>
                        </TextPoint>

                        <TextPoint title="Тема:">
                            <Text variant="h4">{theme || '-'}</Text>
                        </TextPoint>

                        <TextPoint title="Подтема:">
                            <Text variant="h4">{subTheme || '-'}</Text>
                        </TextPoint>
                    </>
                )}
            </InfoSidebar>
        </div>
    );
};

export default TaskSubThemePage;
