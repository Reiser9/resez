import { Paggination } from '../pagination';

export type Promocode = {
    id: number;
    code: string;
    expiredDate: Date | null;
    limit: number | null;
    xp: number;
    coins: number;
    isFinished: boolean;
    createdAt: Date;
    updatedAt: Date;
    activationsCount: number;
    creator: {
        id: number;
        nickname: string;
        avatar: string;
    };
};

export type PromocodeReward = {
    xp: number;
    coins: number;
};

export type PagginationPromocodes = Paggination & {
    promoCodes: Promocode[];
};
