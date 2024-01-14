import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import useAlert from '@/shared/hooks/useAlert';
import { login } from '.';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { initSessionId, initUser, initVerificationCodeData, setIsAuth } from '@/store/slices/user';
import type { LoginResponse } from '@/entities/user';
import type { Error } from '@/api/types';

const useLogin = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();

    return useMutation({
        mutationFn: login,
        onSuccess: ({ data }: { data: LoginResponse }) => {
            dispatch(setIsAuth(true));
            dispatch(initUser(data.user));
            dispatch(initSessionId(data.sessionId));

            if (data.verificationCodeData) {
                dispatch(initVerificationCodeData(data.verificationCodeData));
            }

            localStorage.setItem('accessToken', data.accessToken);

            alertNotify('Успешно', 'Вы авторизовались', 'success');
            router.push('/');
        },
        onError: (error: AxiosError<Error>) => {
            console.log(error);
        },
    });
};

export default useLogin;
