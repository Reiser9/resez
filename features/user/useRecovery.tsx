import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';

import { recoverySendCode } from './auth';
import useAlert from '@/shared/hooks/useAlert';

const useRecovery = () => {
    const { alertNotify } = useAlert();

    const sendCode = useMutation({
        mutationFn: recoverySendCode,
        onSuccess: () => {
            alertNotify('Успешно', 'Для восстановления пароля вам отправлен код подтверждения', 'success');
            // setStep(2);
        },
        onError: (error: AxiosError<Error>) => {
            alertNotify('Ошибка', error?.response?.data?.message || 'Произошла ошибка, попробуйте позже', 'error');
        },
    });

    return {
        sendCode,
    };
};

export default useRecovery;
