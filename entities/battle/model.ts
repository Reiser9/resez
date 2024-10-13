import { UserShort } from '../user';

export type BattleInfo = {
    id: number;
    creatorId: number;
    isPrivate: boolean;
    playersCount: number;
    users: BattleUserInfo[];
};

export type BattleUserInfo = UserShort & {
    socketId: string;
    isLeader: boolean;
};

export type Battle = {
    battle: BattleInfo;
};

export type BattleItem = {
    createdAt: Date;
    id: number;
    isPrivate: boolean;
    playersCount: number;
    updatedAt: Date;
    users: BattleUserInfo[];
};
