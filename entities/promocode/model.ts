import { Paggination } from '../pagination';
import { UserShort } from '../user';

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
    creator: UserShort;
};

export type PromocodeReward = {
    xp: number;
    coins: number;
};

export type PagginationPromocodes = Paggination & {
    promoCodes: Promocode[];
};

export type PromocodeActivationUsers = Paggination & {
    users: (UserShort & {
        date: Date;
    })[];
};
