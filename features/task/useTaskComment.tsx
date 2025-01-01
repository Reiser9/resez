'use client';

import type { TaskComment, PagginationTaskComments } from '@/entities/task';
import useAlert from '@/shared/hooks/useAlert';
import useRequest from '@/shared/hooks/useRequest';
import { buildQueryString } from '@/shared/utils/buildQueryString';

const useTaskComment = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const sendComment = async (
        taskId: number,
        content: string,
        successCallback = () => {},
        parentCommentId?: number,
    ) => {
        const response = await request<{ comment: TaskComment }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/comment`,
            isAuth: true,
            method: 'POST',
            data: {
                taskId,
                content,
                ...(parentCommentId && { parentCommentId }),
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        alertNotify('Успешно', 'Комментарий добавлен', 'success');
        successCallback();

        if ('data' in response) {
            return response.data.comment;
        }
    };

    const getPagginationTaskComments = async (page: number, taskId: number | string) => {
        const limit = 10;
        const queryString = buildQueryString({
            offset: page * limit,
            limit,
            task_id: taskId,
        });

        const response = await request<PagginationTaskComments>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/comment?${queryString}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const editTaskComment = async (taskId: number | string, content: string, successCallback = () => {}) => {
        const response = await request<{ comment: TaskComment }>({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/comment/${taskId}`,
            isAuth: true,
            method: 'PATCH',
            data: {
                content,
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

    const removeTaskComment = async (taskId: number, successCallback = () => {}) => {
        const response = await request({
            url: `/${process.env.NEXT_PUBLIC_EDUCATIONMS_NAME}/comment/${taskId}`,
            isAuth: true,
            method: 'DELETE',
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
        alertNotify('Успешно', 'Комментарий удален', 'success');

        if ('data' in response) {
            return response.data;
        }
    };

    return {
        sendComment,
        getPagginationTaskComments,
        editTaskComment,
        removeTaskComment,
    };
};

export default useTaskComment;
