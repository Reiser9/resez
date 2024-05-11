'use client';

import useRequest from '@/shared/hooks/useRequest';
import { ChatItem, ChatUser, ChatUsersPaggination } from '@/entities/messenger/model';

const useChat = () => {
    const { request, catchRequestError, errorController } = useRequest();

    const createChat = async (data: FormData, successCallback = () => {}) => {
        const response = await request<{ chat: ChatItem }>({
            url: '/messenger/chat',
            data,
            method: 'POST',
            isAuth: true,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();

        if('data' in response){
            return response.data;
        }
    };

    const getChatUsers = async (chatId?: number) => {
        if(!chatId){
            return;
        }

        const response = await request<ChatUsersPaggination>({
            url: `/messenger/chat/${chatId}/user?limit=20`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        if('data' in response){
            return response.data;
        }
    };

    const deleteUserFromChat = async (chatId?: number, userId?: number, successCallback = () => {}) => {
        if(!chatId){
            return;
        }

        const response = await request<ChatUser>({
            url: `/messenger/chat/${chatId}/remove-user/${userId}`,
            isAuth: true,
            method: "DELETE"
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    };

    const leaveFromChat = async (chatId: number, clearHistory = false, successCallback = () => {}) => {
        const response = await request<{chat: ChatItem}>({
            url: `/messenger/chat/${chatId}/leave?clear_history=${clearHistory}`,
            method: 'DELETE',
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    }

    const returnInChat = async (chatId: number, successCallback = () => {}) => {
        const response = await request<{chat: ChatItem}>({
            url: `/messenger/chat/${chatId}/return`,
            isAuth: true,
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    }

    const updateChatAvatar = async (data: FormData, chatId: number, successCallback = () => {}) => {
        const response = await request<{chat: ChatItem}>({
            url: `/messenger/chat/${chatId}/picture`,
            isAuth: true,
            method: "POST",
            data,
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    }

    const removeChatAvatar = async (chatId: number, successCallback = () => {}) => {
        const response = await request<{chat: ChatItem}>({
            url: `/messenger/chat/${chatId}/picture`,
            isAuth: true,
            method: "DELETE"
        });

        if (catchRequestError(response)) {
            return errorController(response);
        }

        successCallback();
    }

    return {
        createChat,
        getChatUsers,
        deleteUserFromChat,
        leaveFromChat,
        returnInChat,
        updateChatAvatar,
        removeChatAvatar
    };
};

export default useChat;
