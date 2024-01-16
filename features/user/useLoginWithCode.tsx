import { useRouter } from 'next/navigation';

import useAlert from '@/shared/hooks/useAlert';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import type { LoginResponse } from '@/entities/user';
import axiosInstance from '@/api/axios';
import { setAuthIsLoading } from '@/store/slices/app';

const useLoginWithCode = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    const loginWithCode = async (code: string) => {
        try {
            dispatch(setAuthIsLoading(true));
            const data = await axiosInstance.post<LoginResponse>(`/auth/login/${code}`);

            dispatch(setIsAuth(true));
            dispatch(initUser(data.data.user));
            dispatch(initSessionId(data.data.sessionId));

            if (data.data.verificationCodeData) {
                dispatch(initVerificationCodeData(data.data.verificationCodeData));
            }

            localStorage.setItem('accessToken', data.data.accessToken);

            alertNotify('Успешно', 'Вы авторизовались', 'success');
            router.push('/');
        } catch (error) {
            alertNotify('Ошибка', 'Произошла ошибка, попробуйте позже', 'error');
        } finally {
            dispatch(setAuthIsLoading(false));
        }
    };

    return {
        loginWithCode,
    };
};

export default useLoginWithCode;
