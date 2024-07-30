'use client';

import React from 'react';

import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { PagginationTasks, PagginationTasksById, SubjectTaskById, SubThemeInfo } from '@/entities/task';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useTask = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationTasks = async ({
        pageParam,
        limit = 9,
        subjectId = '',
        subjectTaskId = '',
        subThemeId = '',
        userId = '',
        isVerified = '',
    }: {
        pageParam: number;
        limit?: number;
        subjectId?: string;
        subjectTaskId?: string;
        subThemeId?: string;
        userId?: string;
        isVerified?: string;
    }) => {
        const queryString = buildQueryString({
            offset: pageParam * limit,
            limit,
            subject_id: subjectId,
            subject_task_id: subjectTaskId,
            subTheme_id: subThemeId,
            user_id: userId,
            is_verified: isVerified,
        });

        const response = await request<PagginationTasks>({
            url: `/education-ms/admin/task?${queryString}`,
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
            url: `/education-ms/task/${taskId}`,
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

    const getTasksBySubThemeId = async (subthemeId: number | string, successCallback = () => {}) => {
        const limit = 10;
        const response = await request<PagginationTasksById>({
            url: `/education-ms/sub-theme/${subthemeId}/task?limit=${limit}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const getSubThemeInfo = async (subthemeId: number | string, successCallback = () => {}) => {
        const response = await request<{ subTheme: SubThemeInfo }>({
            url: `/education-ms/sub-theme/${subthemeId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.subTheme;
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
        getTasksBySubThemeId,
        getSubThemeInfo,
        archiveTask,
    };
};

export default useTask;
