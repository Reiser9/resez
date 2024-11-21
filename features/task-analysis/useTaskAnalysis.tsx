'use client';

import type { TaskAnalysis, TaskAnalysisPaggination } from '@/entities/task-analysis';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';

const useTaskAnalysis = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationTasksAnalysis = async (page: number, limit = 10) => {
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
        });

        const response = await request<TaskAnalysisPaggination>({
            url: `/education-ms/admin/task-analysis?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createTaskAnalysis = async (taskId: number | string, content: string, successCallback = () => {}) => {
        const response = await request<TaskAnalysis>({
            url: '/education-ms/admin/task-analysis',
            isAuth: true,
            method: 'POST',
            data: {
                subjectTaskId: taskId,
                content,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Разбор задания создан', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const togglePublish = async (taskAnalysisId: number | string, successCallback = () => {}) => {
        const response = await request<{taskAnalysis: TaskAnalysis}>({
            url: `/education-ms/admin/task-analysis/${taskAnalysisId}/toggle-publish`,
            isAuth: true,
            method: 'PATCH',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const getTaskAnalysisById = async (taskAnalysisId: number | string, successCallback = () => {}) => {
        const response = await request<TaskAnalysis>({
            url: `/education-ms/admin/task-analysis/${taskAnalysisId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    }
    
    const editTaskAnalysis = async () => {

    }

    return {
        getPagginationTasksAnalysis,
        createTaskAnalysis,
        togglePublish,
        getTaskAnalysisById,
        editTaskAnalysis
    };
};

export default useTaskAnalysis;
