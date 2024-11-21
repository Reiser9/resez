'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { useSubjects } from '@/features/subjects';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';
import { Text } from '@/shared/ui/Text';
import { ScrollSkeleton } from '@/shared/ui/Skeleton';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';

const TaskAnalysisTasks = () => {
    const { slug, task } = useParams();

    const { getAnalysisSubjectBySlug } = useSubjects();

    const {
        data: tasks,
        isLoading: tasksIsLoading,
        isError: tasksIsError,
    } = useQuery({
        queryKey: ['analysis_tasks_by_subject', slug],
        queryFn: () => getAnalysisSubjectBySlug(String(slug)),
        enabled: !!slug,
    });

    if(tasksIsError){
        return <NotContent text="Произошла ошибка при загрузке данных" danger icon={<Cross />} />
    }

    return (
        <>
            <div className={base.baseWrapperGap4}>
                <Text fontWeight={600}>Задание:</Text>

                {tasksIsLoading ? (
                    <ScrollSkeleton />
                ) : (
                    !!tasks?.length && (
                        <ScrollWithArrows>
                            {tasks?.map((data) => (
                                <Link
                                    key={data.id}
                                    prefetch={false}
                                    href={`/useful/task-analysis/${slug}/${data.id}`}
                                    replace
                                    className={cn(base.tag, {
                                        [base.active]: String(task) === String(data.id),
                                    })}
                                >
                                    {data.number}
                                </Link>
                            ))}
                        </ScrollWithArrows>
                    )
                )}
            </div>

            {!tasks?.length ? (
                <NotContent text="Разборов заданий для данного предмета еще нет" />
            ) : (
                !task && <NotContent text="Выберите задание" />
            )}
        </>
    );
};

export default TaskAnalysisTasks;
