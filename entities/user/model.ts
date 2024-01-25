import { Dayjs } from 'dayjs';
import { Paggination } from '../pagination';

export type LoginData = {
    nickname: string;
    password: string;
};

export type LoginWithQRData = {
    code: string;
};

export type RegisterData = LoginData;

export type RecoverySendCode = {
    nickname: string;
};

export type RecoveryVerifyCode = RecoverySendCode & {
    code: string;
};

export type RecoveryChangePassword = RecoveryVerifyCode & {
    password: string;
};

export type VerificationCodeData = {
    code: string;
    lifetime: number;
};

export type Permission = {
    id: number;
    permission: string;
};

export type Settings = {
    isPrivateAccount?: boolean;
    isHideAvatars?: boolean;
};

export type User = {
    id: number;
    nickname: string;
    isVerified: boolean;
    isBlocked: boolean;
    avatar: string | null;
    level: number;
    permissions: Permission[];
    unreadNotifiesCount: number;
    settings: Settings;
};

export type Role = {
    id: number;
    role: string;
    textColor: string;
    backgroundColor: string;
};

export type UserAdmin = {
    id: number;
    nickname: string;
    isVerified: boolean;
    isBlocked: boolean;
    avatar: string | null;
    level: number;
    firstName: string;
    lastName: string;
    registrationDate: Date;
    isOnline: boolean;
    lastActivity: Date;
    status: string;
    xp: number;
    xpLimit: number;
    roles: Role[];
};

export type UsersAdmin = Paggination & {
    users: UserAdmin[];
};

export type ProfileInfo = {
    birthDate: Dayjs | null;
    id?: number;
    firstName: string | null;
    lastName: string | null;
    gender: 'Мужской' | 'Женский' | null;
};

export type UserShortInfo = {
    user: User;
    sessionId: number;
};

export type LoginResponse = {
    accessToken: string;
    sessionId: number;
    verificationCodeData?: VerificationCodeData;
    user: User;
};

export type RegisterResponse = LoginResponse & {
    verificationCodeData: VerificationCodeData;
};

export type ChangePassword = {
    oldPassword: string;
    newPassword: string;
};

export type VerifyChangePassword = ChangePassword & {
    code: string;
};
