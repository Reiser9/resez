'use client';

import type { TaskSnippet, TaskSnippetsPaggination } from '@/entities/task-snippet';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useTaskSnippet = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getPagginationTasksSnippets = async (page: number, subjectId: string | number, limit = 9) => {
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            subject_id: subjectId,
        });

        const response = await request<TaskSnippetsPaggination>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/snippet?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const createSnippet = async (
        title = '',
        subjectId: number | string,
        content: string,
        successCallback = () => {},
    ) => {
        const response = await request<TaskSnippet>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/snippet`,
            isAuth: true,
            method: 'POST',
            data: {
                ...(title && { title }),
                subjectId,
                content,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Вставка задания создана', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const getSnippetById = async (snippetId: number | string) => {
        const response = await request<TaskSnippet>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/snippet/${snippetId}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const editSnippet = async (
        snippetId: number | string,
        title = '',
        subjectId: number | string,
        content: string,
        successCallback = () => {},
    ) => {
        const response = await request<TaskSnippet>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/snippet/${snippetId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                title,
                subjectId,
                content,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Вставка задания отредактирована', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    const deleteSnippetById = async (snippetId: number | string, successCallback = () => {}) => {
        const response = await request<TaskSnippet>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/admin/snippet/${snippetId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Вставка задания удалена', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        getPagginationTasksSnippets,
        createSnippet,
        getSnippetById,
        editSnippet,
        deleteSnippetById,
    };
};

export default useTaskSnippet;
