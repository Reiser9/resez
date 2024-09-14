'use client';

import type { Message } from '@/entities/messenger';
import useRequest from '@/shared/hooks/useRequest';

const useDialog = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const sendStartMessageUser = async (userId: string | number, message: string, successCallback = () => {}) => {
        const response = await request<{ message: Message }>({
            url: `/messenger/message/user/${userId}`,
            data: {
                message,
            },
            method: 'POST',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.message;
        }
    };

    return {
        sendStartMessageUser,
    };
};

export default useDialog;
