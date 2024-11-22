import type { Paggination } from '../pagination';
import { SubjectFilter, SubjectTheme } from '../subject';
import type { UserShort } from '../user';

export type TaskAnalysis = {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isPublished: boolean;
    user: UserShort;
    subject: SubjectFilter & {
        durationMinutes: number;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    subjectTask: SubjectTheme;
};

export type TaskAnalysisPaggination = Paggination & {
    tasksAnalysis: TaskAnalysis[];
};
