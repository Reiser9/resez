import type { Paggination } from '../pagination';
import type { CreatedSubject } from '../subject';
import type { SubjectTaskById } from '../task';

type LogEntity = CreatedSubject | SubjectTaskById;

export type Log = {
    id: number;
    type: string;
    entityId: number;
    createdAt: Date;
    user: {
        id: number;
        nickname: string;
        avatar: string;
    };
};

export type Logs = Paggination & {
    logs: Log[];
};

export type LogById = Log & {
    currentEntity: LogEntity;
    oldEntity: null | LogEntity;
};
