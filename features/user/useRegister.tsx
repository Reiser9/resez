import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import useAlert from "@/shared/hooks/useAlert";
import { register } from "./auth";
import type { Error } from '@/api/types';

const useRegister = () => {
    const router = useRouter();
    const { alertNotify } = useAlert();

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            // TODO: сохранить данные в redux
            alertNotify('Успешно', 'Вы зарегистрировались', 'success');

            localStorage.setItem('accessToken', data.data.accessToken);
            router.push('/');
        },
        onError: (error: AxiosError<Error>) => {
            alertNotify('Ошибка', error?.response?.data.message || 'Произошла ошибка, попробуйте позже', 'error');
        },
    })
}

export default useRegister;