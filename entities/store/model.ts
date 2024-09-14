import type { Paggination } from '../pagination';

export type ProductDTO = {
    id: number;
    title: string;
    price: number;
    seasonStartDate: Date;
    seasonEndDate: Date;
    updatedAt: Date;
    createdAt: Date;
    type: string;
    requiredSubscriptionId: number;
    achievementId: number;
    isArchived: boolean;
    isPublished: boolean;
    isActive: boolean;
    isCollected: boolean;
};

export type AvatarDecoration = ProductDTO & {
    options: { width: number; height: number; x: string; y: string };
    contentUrl: string;
    contentType: string;
};

export type Theme = ProductDTO & {
    primary: string;
    light: string;
};

export type Avatars = Paggination & {
    products: AvatarDecoration[];
};

export type ThemePaggination = Paggination & {
    products: Theme[];
}
