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
};

export type ChatInfo = {
    id: number;
    isGroup: boolean;
    chat: string;
    picture: string;
    membersCount?: number;
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
