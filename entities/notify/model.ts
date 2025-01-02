import type { Paggination } from '../pagination';
import type { UserShort } from '../user';

export type TypesLocalNotify = 'success' | 'info' | 'warn' | 'error' | 'default';
type TypesNotify = 'Сессия' | 'Информация' | 'Подарок' | 'Голосование' | 'Добавление';

export type LocalNotify = {
    id: number;
    title: string;
    text: string;
    type: TypesLocalNotify;
    to?: string;
    time: number;
};

export type Notify = {
    id: number;
    title: string;
    author: string;
    date: Date;
    content: string;
    type: TypesNotify;
    isRead: boolean;
};

export type Notifies = Paggination & {
    notifications: Notify[];
};

export type NotifyType = {
    id: number;
    type: string;
};

export type NotifySendDTO = {
    id: number;
    type: TypesNotify;
    title: string;
    content: string;
    author: string;
    date: Date;
    updatedAt: Date;
    user: UserShort;
    isEdited: boolean;
    isDelayed: boolean;
};

export type AdminNotifiesPaggination = Paggination & {
    notifications: NotifySendDTO[];
};
