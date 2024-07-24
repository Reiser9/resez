import { Paggination } from '../pagination';
import { SubjectDTO, SubjectSubThemeDTO, SubjectTaskDTO } from '../subject';

export type SubjectTask = {
    id: number;
    task: string;
    answer: string;
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
    subject: SubjectDTO & {
        durationMinutes: number;
        isArchived: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
    subjectTask: SubjectTaskDTO;
    subTheme: SubjectSubThemeDTO;
};

export type PagginationTasks = Paggination & {
    tasks: SubjectTask[];
};
