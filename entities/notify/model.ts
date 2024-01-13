export type TypesLocalNotify = 'success' | 'info' | 'warn' | 'error';
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
    sender: string | null;
    date: Date;
    content: string;
    type: TypesNotify;
    isRead: boolean;
};
