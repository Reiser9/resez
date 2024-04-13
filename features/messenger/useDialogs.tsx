'use client';

import useRequest from '@/shared/hooks/useRequest';
import { ChatsDTO, Message } from '@/entities/messenger';
import { ChatInfo, ChatItem } from '@/entities/messenger/model';
import useAlert from '@/shared/hooks/useAlert';

const useDialogs = () => {
    const { request, catchRequestError, errorController } = useRequest();
    const { alertNotify } = useAlert();

    const getDialogs = async () => {
        const response = await request<ChatsDTO>({ url: '/messenger/chat?limit=20', isAuth: true });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getChatById = async (id: string) => {
        const response = await request<{ chat: ChatInfo; messages: Message[] }>({
            url: `/messenger/chat/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const sendMessageInChat = async (chatId: string, message: string, successCallback = () => {}) => {
        const response = await request<{ message: Message[] }>({
            url: `/messenger/message/chat/${chatId}`,
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
    };

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

        if('data' in response){
            return response.data.message;
        }
    };

    const createChat = async (data: FormData, successCallback = () => {}) => {
        const response = await request<{ chat: ChatItem }>({
            url: '/messenger/chat',
            data,
            method: 'POST',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if('data' in response){
            return response.data;
        }
    };

    const deleteMesseges = async (data: FormData, successCallback = () => {}) => {
        const response = await request<{ chat: ChatItem }>({
            url: '/messenger/chat',
            data,
            method: 'POST',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if('data' in response){
            return response.data;
        }
    };

    return {
        getDialogs,
        getChatById,
        sendMessageInChat,
        sendStartMessageUser,
        createChat,
        deleteMesseges
    };
};

export default useDialogs;
