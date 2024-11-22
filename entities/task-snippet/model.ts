import type { Paggination } from '../pagination';
import type { CreatedSubject } from '../subject';
import type { UserShort } from '../user';

export type TaskSnippet = {
    id: number;
    title: string;
    content: string;
    user: UserShort;
    createdAt: Date;
    updatedAt: Date;
    subject: Omit<CreatedSubject, 'subjectTasks'>;
};

export type TaskSnippetDTO = TaskSnippet & {
    subject: string;
};

export type TaskSnippetsPaggination = Paggination & {
    snippets: TaskSnippetDTO[];
};
