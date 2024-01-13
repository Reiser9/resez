import axiosInstance from '@/api/axios';
import type { LoginData, RecoveryData, RegisterData } from '@/entities/user';

export const login = async (data: LoginData) => await axiosInstance.post('auth/login', data);
export const register = async (data: RegisterData) => await axiosInstance.post('/auth/register', data);
export const recoverySendCode = async (data: RecoveryData) => axiosInstance.post('/auth/send-recovery-password-code', data);
export const recoveryVerifyCode = async (data: RecoveryData) => axiosInstance.post('/auth/verify-recovery-password-code', data);
export const recoveryChangePassword = async (data: RecoveryData) => axiosInstance.patch('/auth/recovery-password', data);