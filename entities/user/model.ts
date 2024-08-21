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
    subscription: {
        name: string;
        canUploadImages: boolean;
    };
    balance: number;
};

export type UserShort = {
    id: number;
    nickname: string;
    avatar: string;
};

export type UserAdmin = {
    id: number;
    nickname: string;
    firstName: string;
    lastName: string;
    registrationDate: Date;
    telegramUsername: string;
    isVerified: boolean;
    isBlocked: boolean;
    blockReason: string;
    avatar: string;
    status: string;
    levelInfo: {
        level: number;
        xp: number;
        limit: number;
    };
    roles: Role[];
    balance: number;
    subscription: {
        id: number;
        subscription: string;
    };
    activity: {
        isOnline: boolean;
        lastSeen: Date;
    } | null;
};

export type UsersShortAdmin = Paggination & {
    users: UserShort[];
};

export type UsersAdmin = Paggination & {
    users: UserAdmin[];
};

export type ProfileInfo = {
    id?: number;
    nickname: string;
    firstName: string;
    lastName: string;
    birthDate: Dayjs | undefined | null;
    gender: 'Мужской' | 'Женский' | null;
    avatar?: string;
    avatarDecoration?: ProductDTO;
};

export type ProfileInfoDTO = {
    firstName: string;
    lastName: string;
    birthDate: Dayjs | undefined | null;
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
    avatarDecoration?: ProductDTO;
};
