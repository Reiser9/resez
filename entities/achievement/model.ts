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

export type AchievementCategory = {
    type: string;
    elements: Achievement[];
};
