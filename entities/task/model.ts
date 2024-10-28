import type { Paggination } from '../pagination';
import type { SubjectFilter, SubjectSubTheme, CreatedTask } from '../subject';
import type { UserShort } from '../user';

export type SubjectTask = {
    id: number;
    task: string;
    isVerified: boolean;
    isArchived: boolean;
    source: string;
    user: UserShort;
    createdAt: Date;
    updatedAt: Date;
    subject: string;
    subTheme: string;
    number: number;
    theme: string;

    current: boolean;
    tests: { id: number; subject: string }[];
    testsCount: number;
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
