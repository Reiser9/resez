import type { Paggination } from '../pagination';

export type AdminStats = {
    usersCount: number;
    adminsCount: number;
    blockedUsersCount: number;
    online: number;
};

export type WarnsPaggination = Paggination & {
    feedback: Warn[];
};

export type Warn = {
    id: number;
    text: string;
    user: null | {
        id: number;
        nickname: string;
        avatar: string;
    };
    createdAt: Date;
    isRead: boolean;
};
