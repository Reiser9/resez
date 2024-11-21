import { Dayjs } from 'dayjs';
import type { Paggination } from '../pagination';
import type { Role } from '../role';
import type { AvatarDecorationAdmin, AvatarDecorationProfileAndStore } from '../store';
import type { SubscriptionOfUser } from '../subscription';

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

export type LevelInfo = {
    level: number;
    xp: number;
    limit: number;
};

export type Gender = 'Мужской' | 'Женский' | null;

export type User = {
    id: number;
    nickname: string;
    isVerified: boolean;
    isBlocked: boolean;
    blockReason: string;
    avatar: string;
    levelInfo: LevelInfo;
    subscription: SubscriptionOfUser;
    balance: number;
    theme: {
        id: number;
        primary: string;
        light: string;
    } | null;
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
    levelInfo: LevelInfo;
    roles: Role[];
    balance: number;
    subscription: SubscriptionOfUser;
    activity: {
        isOnline: boolean;
        lastSeen: Date;
    } | null;
};

export type UserAdminProfile = {
    id: number;
    nickname: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    isBlocked: boolean;
    blockReason: string;
    avatar: string;
    avatarDecoration: AvatarDecorationAdmin;
    status: string;
    activity: {
        isOnline: boolean;
        lastSeen: Date;
    } | null;
};

export type ActivityItem = {
    id: number;
    type: string;
    date: Date;
};

export type UserMainInfo = {
    levelInfo: LevelInfo;
    balance: number;
    subscription: SubscriptionOfUser;
    activity: ActivityItem[];
};

export type UsersShortAdmin = Paggination & {
    users: UserShort[];
};

export type UsersAdmin = Paggination & {
    users: UserAdmin[];
};

export type UserProfile = {
    id: number;
    nickname: string;
    firstName: string;
    lastName: string;
    avatar: string;
    avatarDecoration?: AvatarDecorationProfileAndStore;
};

export type ProfileInfo = UserProfile & {
    birthDate: Dayjs | undefined | null;
    gender: Gender;
};

export type ProfileInfoDTO = {
    firstName: string;
    lastName: string;
    birthDate: Dayjs | undefined | null;
    gender: Gender;
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
