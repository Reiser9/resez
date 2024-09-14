import type { Paggination } from '../pagination';

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
    likesCount: number;
    isLiked: boolean;
    hasPictures: boolean;
    user: {
        id: number;
        nickname: string;
        avatar: string | null;
    };
};

export type Pair = {
    id: number;
    questionText: string;
    questionPicture: string;
    answerText: string;
    answerPicture: string;
};

export type PairDTO = {
    id: number;
    questionText?: string;
    questionPicture?: string;
    answerText?: string;
    answerPicture?: string;
};

export type PairsCollectionById = Paggination & {
    cards: Pair[];
};

export type Excel = {
    A: string;
    B: string;
};

export type CollectionSettings = {
    shuffleCards: boolean;
    cardsAnswerOnFront: boolean;
    shuffleMemorization: boolean;
    showAnswerImmediately: boolean;
    maxQuestions: number;
    shuffleTest: boolean;
    testAnswerOnFront: boolean;
    answerChoiceMode: boolean;
    trueFalseMode: boolean;
    writeMode: boolean;
};

export type CollectionWrite = {
    id: number;
    mode: 'WRITE';
    questionText: string;
    questionPicture: string;
    answerText: string;
};

export type CollectionValidation = {
    id: number;
    mode: 'VALIDATION';
    questionText: string;
    questionPicture: string;
    answerText: string;
    answerPicture: string;
    isCorrect: boolean;
    correctAnswer?: string;
};

type Choice = {
    id: number;
    answerText: string;
    answerPicture: string;
    isCorrect: boolean;
};

export type CollectionChoice = {
    id: number;
    mode: 'CHOICE';
    questionText: string;
    questionPicture: string;
    choices: Choice[];
};

export type MatchItem = {
    id: string;
    text: string;
    picture: string;
    answerId: string;
};
