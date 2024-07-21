import { Paggination } from '../pagination';

export type SubjectTask = {
    id: number;
    task: string;
    answer: string;
    isVerified: boolean;
    isArchived: boolean;
    source: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    subject: string;
    subTheme: string;
    number: number;
    theme: string;
};

export type PagginationTasks = Paggination & {
    tasks: SubjectTask[];
};
