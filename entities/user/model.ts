export type LoginData = {
    nickname: string;
    password: string;
};

export type RegisterData = LoginData;

export type RecoveryData = {
    code: string;
} & LoginData;

export type VerificationCodeData = {
    code: string;
    lifetime: number;
};

export type User = {
    id: number;
    nickname: string;
    isVerified: boolean;
    isBlocked: boolean;
    avatar: string | null;
    level: number;
};

export type AuthResponse = {
    accessToken?: string;
    sessionId: number;
    verificationCodeData?: VerificationCodeData;
    user: User;
};