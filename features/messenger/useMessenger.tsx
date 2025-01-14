'use client';

import type { FileInfo } from '@/entities/file';
import type { ChatsDTO, Message, ChatInfo, ChatItem } from '@/entities/messenger';
import useRequest from '@/shared/hooks/useRequest';
import { buildQueryString } from '@/shared/utils/buildQueryString';

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

    const sendMessageInChat = async (
        chatId: string,
        message: string,
        files: FileInfo[] = [],
        successCallback = () => {},
        parentMessageId?: number,
    ) => {
        const response = await request<{ message: Message }>({
            url: `/messenger/message/chat/${chatId}`,
            data: {
                message,
                files,
                ...(parentMessageId && { parentMessageId }),
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

    const deleteMessageById = async (messageIds: number[], forAll = false, successCallback = () => {}) => {
        const queryString = buildQueryString({
            for_all: forAll,
            ids: messageIds,
        });

        const response = await request<{ message: Message }>({
            url: `/messenger/message?${queryString}`,
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

    const getCountUnreadChats = async () => {
        const response = await request<{ count: number }>({
            url: `/messenger/chat/unread-count`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if ('data' in response) {
            return response.data.count;
        }
    };

    const readMessages = async (messageId: number | string, successCallback = () => {}) => {
        const response = await request({
            url: `/messenger/message/${messageId}/read`,
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

    const getReactionForMessage = async (messageId: number | string, reaction: string, successCallback = () => {}) => {
        const response = await request({
            url: `/messenger/message/${messageId}/reaction`,
            isAuth: true,
            method: 'PATCH',
            data: {
                reaction,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
        }
    };

    const userTyping = async (chatId: number | string, isTyping: boolean, successCallback = () => {}) => {
        const response = await request({
            url: `/messenger/chat/${chatId}/typing`,
            isAuth: true,
            method: 'POST',
            data: {
                isTyping,
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if ('data' in response) {
            return response.data;
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
        getCountUnreadChats,
        readMessages,
        getReactionForMessage,
        userTyping,
    };
};

export default useMessenger;
