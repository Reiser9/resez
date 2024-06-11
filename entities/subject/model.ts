import { Paggination } from "../pagination";

export type SubTheme = {
    id?: number;
    subTheme: string;
};

export type Task = {
    id?: number;
    theme: string;
    primaryScore: string;
    isDetailedAnswer: boolean;
    subThemes: SubTheme[];
};

export type Subject = {
    id?: number,
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

export type PagginationSubjects = Paggination & {
    subjects: SubjectDTO[]
}