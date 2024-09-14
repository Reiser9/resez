import type { Paggination } from '../pagination';

export type Session = {
    browser: string;
    browserVersion: string;
    city: string;
    country: string;
    date: Date;
    deviceType: string;
    id: number;
    ip: string;
    isActive: boolean;
    os: string;
    platform: string;
};

export type Sessions = Paggination & {
    current: Session;
    other: Session[];
};

export type AdminUserSessions = Paggination & {
    sessions: Session[];
};
