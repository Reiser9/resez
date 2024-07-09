import { Paggination } from '../pagination';

export type ProductDTO = {
    id: number;
    title: string;
    contentType: string;
    price: number;
    seasonStartDate: Date;
    seasonEndDate: Date;
    options: any;
    contentUrl: string;
    updatedAt: Date;
    createdAt: Date;
    type: string;
    requiredSubscriptionId: number;
    achievementId: number;
    isArchived: boolean;
    isPublished: boolean;
};

export type Avatars = Paggination & {
    products: ProductDTO[];
};
