import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { login } from '.';
import { AuthResponse } from '@/entities/user';
import useAlert from '@/shared/hooks/useAlert';
import type { Error } from '@/api/types';

const useLogin = () => {
    const router = useRouter();
    const { alertNotify } = useAlert();

    return useMutation({
        mutationFn: login,
        onSuccess: ({ data }: { data: AuthResponse }) => {
            // TODO: сохранить данные в redux
            data.accessToken && localStorage.setItem('accessToken', data.accessToken);

            alertNotify('Успешно', 'Вы авторизовались!', 'success');
            router.push('/');
        },
        onError: (error: AxiosError<Error>) => {
            console.log(error);
        },
    });
};

export default useLogin;
