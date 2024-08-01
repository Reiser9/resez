'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from '../../[id]/index.module.scss';

import { useTask } from '@/features/task';
import { Preloader } from '@/shared/ui/Preloader';
import { TextPoint } from '@/shared/ui/TextPoint';
import { Text } from '@/shared/ui/Text';
import { InfoSidebar } from '@/shared/ui/InfoSidebar';
import TaskTestItem from '@/entities/task/ui/TaskTestItem';
import { Button } from '@/shared/ui/Button';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';

const TaskSubThemePage = () => {
    const { id } = useParams();

    const [infoMenu, setInfoMenu] = React.useState(false);

    const { getTasksBySubThemeId, getSubThemeInfo } = useTask();

    const { data, isLoading, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['task_by_subtheme_id', id],
        queryFn: (param) => getTasksBySubThemeId(param.pageParam, String(id)),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = !lastPage?.isLast ? allPages.length : undefined;

            return nextPage;
        },
        enabled: !!id,
    });

    const {
        data: subthemeInfo,
        isLoading: subthemeInfoIsLoading,
        error: subthemeInfoError,
    } = useQuery({
        queryKey: ['subtheme_info_by_id', id],
        queryFn: () => getSubThemeInfo(String(id)),
        enabled: !!id,
    });

    const { number, subTheme, subject, theme } = subthemeInfo || {};

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={styles.taskInner}>
            <div className={base.taskContent}>
                {isLoading ? (
                    <div className={base.contentItems}>
                        {[...Array(3)].map((_, id) => (
                            <p key={id}>Загрузка..</p>
                        ))}
                    </div>
                ) : error ? (
                    <NotContent text="Произошла ошибка при загрузке данных" icon={<Cross />} danger />
                ) : data?.pages[0]?.totalCount === 0 ? (
                    <NotContent text="Заданий не найдено" />
                ) : (
                    <div className={base.contentItems}>
                        {data?.pages.map((task) =>
                            task?.tasks.map((data) => <TaskTestItem key={data.id} data={data} taskWithLink />),
                        )}
                    </div>
                )}

                {hasNextPage && (
                    <Button auto onClick={fetchNextPage} loading={isFetchingNextPage} className={base.buttonShowMore}>
                        Показать еще
                    </Button>
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
                            <Text variant="h4">{subject}</Text>
                        </TextPoint>

                        <TextPoint title="Номер задания:">
                            <Text variant="h4">{number}</Text>
                        </TextPoint>

                        <TextPoint title="Тема:">
                            <Text variant="h4">{theme}</Text>
                        </TextPoint>

                        <TextPoint title="Подтема:">
                            <Text variant="h4">{subTheme}</Text>
                        </TextPoint>
                    </>
                )}
            </InfoSidebar>
        </div>
    );
};

export default TaskSubThemePage;
