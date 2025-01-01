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
    answers: string[];
};

export type PagginationTasks = Paggination & {
    current?: SubjectTask;
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

export type TaskComment = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserShort;
};

export type TaskCommentWithReplies = TaskComment & {
    repliesCount: number;
    replies: TaskComment[];
};

export type PagginationTaskComments = Paggination & {
    comments: TaskCommentWithReplies[];
};
