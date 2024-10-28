import { AchievementShort } from '../achievement';
import type { Paggination } from '../pagination';
import { SubscriptionShort } from '../subscription';

type ProductDTO = {
    id: number;
    title: string;
    price: number;
    isFree: boolean;
    seasonStartDate: Date;
    seasonEndDate: Date;
    requiredSubscription: SubscriptionShort;
    requiredAchievement: AchievementShort & {
        type: string;
    };
};

type ProductProfileAndStore = ProductDTO & {
    type: string;
    isActive: boolean;
    isCollected: boolean;
};

type ProductAdmin = ProductDTO & {
    isPublished: boolean;
    updatedAt: Date;
    createdAt: Date;
    usersCount: number;
};

// Avatar Decoration
export type AvatarDecorationProfileAndStore = ProductProfileAndStore & {
    options: { width: number; height: number; x: string; y: string };
    contentUrl: string;
    contentType: string;
};

export type AvatarDecorationAdmin = ProductAdmin & {
    options: { width: number; height: number; x: string; y: string };
    contentUrl: string;
    contentType: string;
};

export type AvatarDecorationPagginationProfileAndStore = Paggination & {
    products: AvatarDecorationProfileAndStore[];
};

export type AvatarDecorationPagginationAdmin = Paggination & {
    products: AvatarDecorationAdmin[];
};

// Theme
export type ThemeProfileAndStore = ProductProfileAndStore & {
    primary: string;
    light: string;
};

export type ThemeAdmin = ProductAdmin & {
    primary: string;
    light: string;
};

export type ThemePagginationProfileAndStore = Paggination & {
    products: ThemeProfileAndStore[];
};

export type ThemePagginationAdmin = Paggination & {
    products: ThemeAdmin[];
};
