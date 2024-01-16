export type Paggination = {
    elementsCount: number;
    totalCount: number;
    isLast: boolean;
}

export type Session = {
    browser: string;
    browserVersion: string;
    city: string | null;
    country: string | null;
    date: Date;
    deviceType: string;
    id: number;
    ip: string;
    isActive: boolean;
    os: string;
    platform: string;
}

export type Sessions = Paggination & {
    current: Session;
    other: Session[];
};