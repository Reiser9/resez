import axiosInstance from '@/api/axios';
import type {
    LoginData,
    RecoverySendCode,
    RecoveryVerifyCode,
    RecoveryChangePassword,
    RegisterData,
} from '@/entities/user';

export const login = async (data: LoginData) => await axiosInstance.post('auth/login', data);
export const register = async (data: RegisterData) => await axiosInstance.post('/auth/register', data);
export const recoverySendCode = async (data: RecoverySendCode) =>
    axiosInstance.post('/auth/send-recovery-password-code', data);
export const recoveryVerifyCode = async (data: RecoveryVerifyCode) =>
    axiosInstance.post('/auth/verify-recovery-password-code', data);
export const recoveryChangePassword = async (data: RecoveryChangePassword) =>
    axiosInstance.patch('/auth/recovery-password', data);
