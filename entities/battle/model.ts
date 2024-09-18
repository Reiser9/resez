export type BattleInfo = {
    id: number;
    creatorId: number;
    isPrivate: boolean;
    playersCount: number;
};

export type BattleUserInfo = {
    id: number;
    nickname: string;
    avatar: string;
    socketId: string;
};

export type Battle = {
    battle: BattleInfo;
    users: BattleUserInfo[];
};
