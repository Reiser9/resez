import { Paggination } from '../pagination';

export type Collections = Paggination & {
    collections: Collection[];
};

export type CollectionDTO = {};

export type Collection = {
    id: number;
    collection: string;
    description?: string;
    isPrivate: boolean;
    pairsCount: number;
    createdAt: Date;
    updatedAt: Date;
    user: {
        id: number;
        nickname: string;
        avatar: string | null;
    };
};

export type QAPair = {
    id: number;
    question: string;
    answer: string;
};

export type CollectionSingle = Collection & {
    QAPairs?: QAPair[];
};
