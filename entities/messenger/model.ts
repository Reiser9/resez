import { Paggination } from '../pagination';

export type Message = {
    chatId: number;
    id: number;
    message: string;
    type: 'Системное' | 'Обычное' | 'Голосовое' | 'Видео';
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    sender: {
        id: number;
        nickname: string;
        avatar: string;
    };
    readCount: number;
};

export type ChatInfo = {
    id: number;
    isGroup: boolean;
    isAdmin: boolean;
    isLeft: boolean;
    isKicked: boolean;
    userId?: number;
    chat: string;
    picture: string;
    membersCount?: number;
    inviteLink: string;
};

export type ChatItem = ChatInfo & {
    lastMessage: Message;
};

export type ChatsDTO = {
    totalCount: number;
    isLast: boolean;
    elementsCount: number;
    chats: ChatItem[];
};

export type ChatUser = {
    id: number;
    nickname: string;
    avatar: string;
    isAdmin: boolean;
};

export type ChatUsersPaggination = Paggination & {
    users: ChatUser[];
};
