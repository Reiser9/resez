import { Paggination } from '../pagination';

export type Test = {
    id: number;
    isPrivate: boolean;
    isOfficial: boolean;
    isExam: boolean;
    createdAt: Date;
    updatedAt: Date;
    subject: string;
    tasksCount: number;
};

export type PagginationTests = Paggination & {
    tests: Test[];
};

export type TestTask = {
    id: number;
    number: number;
    theme: string;
    subTheme: string;
    isDetailedAnswer: boolean;
    task: string;
};

export type TestById = Test & {
    user: {
        id: number;
        nickname: string;
        avatar: string;
    };
    tasks: TestTask[];
};
