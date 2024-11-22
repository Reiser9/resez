'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { Cross } from '@/shared/icons';
import { useSubjects } from '@/features/subjects';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';
import { ScrollSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const TaskAnalysisSubjects = () => {
    const { slug } = useParams();

    const { getSubjects } = useSubjects();

    const {
        data: subjects,
        isLoading: subjectsIsLoading,
        isError: subjectsIsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjects,
    });

    if (subjectsIsError) {
        return <NotContent text="Произошла ошибка при загрузке данных" danger icon={<Cross />} />;
    }

    return (
        <>
            <div className={base.baseWrapperGap4}>
                <Text fontWeight={600}>Предмет:</Text>

                {subjectsIsLoading ? (
                    <ScrollSkeleton />
                ) : (
                    !!subjects?.subjects?.length && (
                        <ScrollWithArrows>
                            {subjects?.subjects.map((data) => (
                                <Link
                                    key={data.id}
                                    prefetch={false}
                                    href={`/useful/task-analysis/${data.slug}`}
                                    replace
                                    className={cn(base.tag, {
                                        [base.active]: slug === data.slug,
                                    })}
                                >
                                    {data.subject}
                                </Link>
                            ))}
                        </ScrollWithArrows>
                    )
                )}
            </div>

            {!slug && <NotContent text="Выберите предмет" />}
        </>
    );
};

export default TaskAnalysisSubjects;
