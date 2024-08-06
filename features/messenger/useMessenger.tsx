'use client';

import useRequest from '@/shared/hooks/useRequest';
import { ChatsDTO, Message } from '@/entities/messenger';
import { ChatInfo, ChatItem } from '@/entities/messenger/model';

const useMessenger = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const getDialogs = async () => {
        // Сделать с пагинацией
        const response = await request<ChatsDTO>({ url: '/messenger/chat?limit=20', isAuth: true });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data;
        }
    };

    const getChatById = async (id: string, failedCallback = () => {}) => {
        const response = await request<{ chat: ChatInfo; messages: Message[] }>({
            url: `/messenger/chat/${id}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response, '', failedCallback);
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

    const editMessage = async (messageId: number, message: string, successCallback = () => {}) => {
        const response = await request<{ message: Message }>({
            url: `/messenger/message/${messageId}`,
            method: 'PATCH',
            isAuth: true,
            data: {
                message,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    const clearChatHistory = async (chatId: number, successCallback = () => {}) => {
        const response = await request<{ chat: ChatItem }>({
            url: `/messenger/chat/${chatId}/history`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    const deleteMessageById = async (messageId: number, forAll = false, successCallback = () => {}) => {
        const response = await request<{ message: Message }>({
            url: `/messenger/message/${messageId}?for_all=${forAll}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    const joinChatFromLink = async (link: string, successCallback = () => {}) => {
        const response = await request<{ chat: ChatItem; messages: Message[] }>({
            url: `/messenger/chat/join/${link}`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data.chat;
        }
    };

    return {
        getDialogs,
        getChatById,
        sendMessageInChat,
        editMessage,
        clearChatHistory,
        deleteMessageById,
        joinChatFromLink,
    };
};

export default useMessenger;
