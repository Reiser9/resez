import { FileInfo } from '../file';
import type { Paggination } from '../pagination';
import type { UserShort } from '../user';

export type Message = {
    chatId: number;
    id: number;
    message: string;
    type: 'Системное' | 'Обычное' | 'Голосовое' | 'Видео';
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    sender: UserShort;
    readsCount: number;
    files: (FileInfo & { id: number })[];
};

export type ChatInfo = {
    id: number;
    isGroup: boolean;
    isAdmin: boolean;
    isLeft: boolean;
    isKicked: boolean;
    userId?: number;
    chat: string;
    activity: {
        isOnline: boolean;
        lastSeen: Date;
    };
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
    activity: {
        isOnline: boolean;
        lastSeen: Date;
    };
};

export type ChatUsersPaggination = Paggination & {
    users: ChatUser[];
};
