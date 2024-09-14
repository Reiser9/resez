import type { Paggination } from '../pagination';
import type { SubjectFilter, SubjectSubTheme, CreatedTask } from '../subject';

export type SubjectTask = {
    id: number;
    task: string;
    answers: string[];
    isVerified: boolean;
    isArchived: boolean;
    source: string;
    user: {
        id: number;
        avatar: string;
        nickname: string;
    };
    createdAt: Date;
    updatedAt: Date;
    subject: string;
    subTheme: string;
    number: number;
    theme: string;
};

export type SubjectTaskById = SubjectTask & {
    solution: string;
    subject: SubjectFilter & {
        durationMinutes: number;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    subjectTask: CreatedTask;
    subTheme: SubjectSubTheme;
    userAnswer: string;
    isCorrect: boolean;
    primaryScore: number;
};

export type PagginationTasks = Paggination & {
    tasks: SubjectTask[];
};

export type PagginationTasksById = Paggination & {
    tasks: SubjectTaskById[];
};

export type SubThemeInfo = {
    subject: string;
    number: number;
    theme: string;
    id: number;
    subTheme: string;
};
