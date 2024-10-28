export type Achievement = {
    id: number;
    type: string;
    achievement: string;
    description: string;
    coins: number;
    icon: string;
    xp: number;
    isCollected: boolean;
    createdAt: Date;
    targetValue: number;
    progress: number;
};

export type AchievementShort = {
    id: number;
    achievement: string;
    description: string;
    icon: string;
}

export type AchievementCategory = {
    type: string;
    elements: Achievement[];
};

export type AchievementCategoryShort = {
    type: string;
    elements: AchievementShort[];
}
