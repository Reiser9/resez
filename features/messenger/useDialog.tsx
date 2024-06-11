'use client';

import useRequest from '@/shared/hooks/useRequest';
import { Message } from '@/entities/messenger';

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
