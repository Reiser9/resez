import { Paggination } from '../pagination';

export type ProductDTO = {
    id: number;
    title: string;
    contentType: string;
    price: number;
    seasonStartDate: Date;
    seasonEndDate: Date;
    options: { width: number; height: number; x: string; y: string };
    contentUrl: string;
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

export type Avatars = Paggination & {
    products: ProductDTO[];
};
