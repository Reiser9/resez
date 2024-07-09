import { Dayjs } from 'dayjs';
import { Paggination } from '../pagination';
import { Role } from '../role';
import { ProductDTO } from '../store';

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
    blockReason: string;
    avatar: string;
    levelInfo: {
        level: number;
        xp: number;
        limit: number;
    };
    permissions: Permission[];
    unreadNotifiesCount: number;
    settings: Settings;
};

export type UserAdmin = {
    id: number;
    nickname: string;
    isVerified: boolean;
    isBlocked: boolean;
    blockReason: string;
    avatar: string;
    level: number;
    firstName: string;
    lastName: string;
    registrationDate: Date;
    status: string;
    levelInfo: {
        level: number;
        xp: number;
        limit: number;
    };
    activity: {
        isOnline: boolean;
        lastSeen: Date;
    } | null;
    subscription: {
        name: string;
        canUploadImages: boolean;
    };
    roles: Role[];
};

export type UsersAdmin = Paggination & {
    users: UserAdmin[];
};

export type ProfileInfo = {
    birthDate: Dayjs | undefined | null;
    id?: number;
    firstName: string;
    lastName: string;
    gender: 'Мужской' | 'Женский' | null;
    avatar?: string;
    avatarDecoration?: ProductDTO;
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

export type UserSearch = {
    id: number;
    nickname: string;
    avatar: string;
};

export type UsersSearch = Paggination & {
    users: UserSearch[];
};

export type UserProfile = {
    id: number;
    nickname: string;
    firstName: string;
    lastName: string;
    avatar: string;
};
