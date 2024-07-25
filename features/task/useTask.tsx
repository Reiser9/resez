'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { PagginationTasks, SubjectTaskById } from '@/entities/task';

const useTask = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationTasks = async ({ pageParam }: { pageParam: number }) => {
        const limit = 9;
        const response = await request<PagginationTasks>({
            url: `/education-ms/admin/task?offset=${pageParam * limit}&limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createTask = async (
        subjectId: number | string,
        subjectTaskId: number | string,
        subThemeId: number | string,
        task: string,
        isVerified: boolean,
        solution?: string,
        answers?: string[],
        source?: string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: '/education-ms/admin/task',
            isAuth: true,
            method: 'POST',
            data: {
                subjectId,
                subjectTaskId,
                subThemeId,
                task,
                isVerified,
                solution,
                answers,
                source,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Задание создано', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const editTask = async (
        taskId: number | string,
        subjectId: number | string,
        subjectTaskId: number | string,
        subThemeId: number | string,
        task: string,
        isVerified: boolean,
        solution?: string,
        answers?: string[],
        source?: string,
        successCallback = () => {},
    ) => {
        const response = await request({
            url: `/education-ms/admin/task/${taskId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                subjectId,
                subjectTaskId,
                subThemeId,
                task,
                isVerified,
                solution,
                answers,
                source,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Задание сохранено', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const toggleVerify = async (taskId: number | string, successCallback = () => {}) => {
        const response = await request<{ task: SubjectTaskById }>({
            url: `/education-ms/admin/task/${taskId}/toggle-verify`,
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

    const getTaskById = async (taskId: number | string, successCallback = () => {}) => {
        const response = await request<{ task: SubjectTaskById }>({
            url: `/education-ms/admin/task/${taskId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.task;
        }
    };

    const archiveTask = async (taskId: number, successCallback = () => {}) => {
        const response = await request({
            url: `/education-ms/admin/task/${taskId}/archive`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Задание перенесено в архив', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getPagginationTasks,
        createTask,
        editTask,
        toggleVerify,
        getTaskById,
        archiveTask,
    };
};

export default useTask;
