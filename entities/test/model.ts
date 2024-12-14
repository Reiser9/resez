import type { Paggination } from '../pagination';
import type { SubjectTheme, SubjectSubTheme } from '../subject';

export type Test = {
    id: number;
    isPrivate: boolean;
    isOfficial: boolean;
    isExam: boolean;
    createdAt: Date;
    updatedAt: Date;
    subject: string;
    tasksCount: number;
    durationMinutes: number;
};

export type PagginationTests = Paggination & {
    tests: Test[];
};

export type TestTask = {
    id: number;
    task: string;
    subTheme: SubjectSubTheme;
    subjectTask: SubjectTheme;
    testsCount: number;
};

export type TestById = Test & {
    user: {
        id: number;
        nickname: string;
        avatar: string;
    };
    tasks: TestTask[];
    primaryScore: number;
};

export type SimpleTaskResult = {
    id: number;
    number: number;
    answer: string;
    isCorrect: boolean;
    correctAnswers: string[];
};

export type DetailedTaskResult = {
    id: number;
    number: number;
    primaryScore: number;
    maxPrimaryScore: number;
};

export type TestResult = {
    isExam: boolean;
    isMark: boolean;
    simpleTasks: SimpleTaskResult[];
    detailedTasks: DetailedTaskResult[];
    primaryScore: number;
    maxPrimaryScore: number;
    grade: number;
    secondaryScore: number;
    secondsSpent: number;
};

export type TestHistory = {
    id: number;
    testId: number;
    subject: {
        id: number;
        subject: string;
    };
    durationMinutes: number;
    maxPrimaryScore: number;
    secondsSpent: number;
    primaryScore: number;
    secondaryScore: number;
    grade: number;
    createdAt: Date;
};

export type TestHistoryById = TestHistory & {
    user: {
        id: number;
        avatar: string;
        nickname: string;
    };
    tasks: TaskHistory[];
};

export type TaskHistory = {
    id: number;
    task: string;
    solution: string;
    source: string;
    userAnswer: string;
    isCorrect: boolean;
    primaryScore: number;
    answers: string[];
    subjectTask: SubjectTheme;
    subTheme: SubjectSubTheme;
};

export type PagginationTestsHistory = Paggination & {
    history: TestHistory[];
};
