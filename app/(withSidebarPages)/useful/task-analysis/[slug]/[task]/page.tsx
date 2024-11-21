'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useTaskAnalysis } from '@/features/task-analysis';
import { UsefulTaskItem } from '../../ui';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';

const UsefulTaskAnalysisTask = () => {
    const { task } = useParams();

    const { getTaskAnalysisById } = useTaskAnalysis();

    const {
        data: taskData,
        isLoading: tasksIsLoading,
        isError: tasksIsError,
    } = useQuery({
        queryKey: ['task_analysis_by_id', task],
        queryFn: () => getTaskAnalysisById(String(task)),
        enabled: !!task,
    });

    if (tasksIsLoading) {
        return <Preloader page small />;
    }

    if (tasksIsError) {
        return <NotContent text="Произошла ошибка при загрузке данных" danger icon={<Cross />} />;
    }

    return <>{taskData?.content && <UsefulTaskItem content={taskData?.content} />}</>;
};

export default UsefulTaskAnalysisTask;
