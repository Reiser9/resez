import { Paggination } from '../pagination';

export type SubTheme = {
    id?: number;
    subTheme: string;
    tasksCount: number;
};

export type Task = {
    id?: number;
    theme: string;
    primaryScore: string;
    isDetailedAnswer: boolean;
    subThemes: SubTheme[];
    tasksCount: number;
};

export type Subject = {
    id?: number;
    subject: string;
    slug: string;
    durationMinutes: string;
    isPublished: boolean;
    isMark: boolean;
    subjectTasks: Task[];
};

export type SubjectDTO = {
    id: number;
    subject: string;
    slug: string;
    isPublished: boolean;
    subjectTasksCount: number;
    tasksCount: number;
};

export type SubjectTaskDTO = {
    id: number;
    number: number;
    theme: string;
    primaryScore: number;
    isDetailedAnswer: boolean;
};

export type SubjectTaskCreate = SubjectTaskDTO & {
    subThemes: {
        id: number;
        subTheme: string;
        tasksCount: number;
    }[];
    tasksCount: number;
};

export type SubjectSubThemeDTO = {
    id: number;
    subTheme: string;
};

export type PagginationSubjects = Paggination & {
    subjects: SubjectDTO[];
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
