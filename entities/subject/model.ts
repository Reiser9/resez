import type { Paggination } from '../pagination';

type TaskBody = {
    theme: string;
    primaryScore: number | string;
    isDetailedAnswer: boolean;
    tasksCount: number;
};

export type Task = TaskBody & {
    id?: number;
    subThemes: SubTheme[];
};

export type CreatedTask = TaskBody & {
    id: number;
    number: number;
    subThemes: CreatedSubTheme[];
};

type SubjectBody = {
    subject: string;
    slug: string;
    durationMinutes: string | number;
    isPublished: boolean;
    isMark: boolean;
    order: number;
};

export type Subject = SubjectBody & {
    id?: number;
    subjectTasks: Task[];
};

export type CreatedSubject = SubjectBody & {
    id: number;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    subjectTasks: CreatedTask[];
};

export type SubTheme = {
    id?: number;
    subTheme: string;
    tasksCount: number;
};

export type CreatedSubTheme = {
    id: number;
    subTheme: string;
    tasksCount: number;
};

export type SubjectFilter = {
    id: number;
    subject: string;
    slug: string;
    isPublished: boolean;
    subjectTasksCount: number;
    tasksCount: number;
};

export type SubjectTheme = {
    id: number;
    number: number;
    theme: string;
    primaryScore: number;
    isDetailedAnswer: boolean;
};

export type SubjectTaskCreate = CreatedTask & {
    subThemes: CreatedSubTheme[];
    tasksCount: number;
};

export type SubjectSubTheme = {
    id: number;
    subTheme: string;
};

export type PagginationSubjects = Paggination & {
    subjects: SubjectFilter[];
};

export type ScoreConversionItem = {
    primaryScore: number | string;
    isRed: boolean;
    isGreen: boolean;
    secondaryScore: number | string;
};

export type MarkConversionItem = {
    minScore: string;
    maxScore: string;
    grade: number;
    isRed: boolean;
    isGreen: boolean;
};

export type ScoreConversion = {
    id: number;
    minScore: string;
    maxScore: string;
    primaryScore: number;
    isRed: boolean;
    isGreen: boolean;
    secondaryScore: string;
    grade: number;
};

export type SubjectTask = {
    id: number;
    number: number;
    primaryScore: number;
};
