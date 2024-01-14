import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import useAlert from '@/shared/hooks/useAlert';
import { register } from './auth';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import type { Error } from '@/api/types';
import type { RegisterResponse } from '@/entities/user/model';

const useRegister = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    return useMutation({
        mutationFn: register,
        onSuccess: ({ data }: { data: RegisterResponse }) => {
            dispatch(setIsAuth(true));
            dispatch(initUser(data.user));
            dispatch(initSessionId(data.sessionId));
            dispatch(initVerificationCodeData(data.verificationCodeData));

            alertNotify('Успешно', 'Вы зарегистрировались', 'success');

            localStorage.setItem('accessToken', data.accessToken);
            router.push('/');
        },
        onError: (error: AxiosError<Error>) => {
            alertNotify('Ошибка', error?.response?.data.message || 'Произошла ошибка, попробуйте позже', 'error');
        },
    });
};

export default useRegister;
