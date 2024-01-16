'use client';

import React from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import cn from 'classnames';

import auth from '@/shared/styles/auth.module.scss';
import base from '@/shared/styles/base.module.scss';

import useAlert from '@/shared/hooks/useAlert';
import { AuthFormsWrapper } from '@/shared/wrappers/AuthFormsWrapper';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { BackButton } from '@/shared/ui/BackButton';
import { recoveryChangePassword, recoverySendCode, recoveryVerifyCode } from '@/features/user/auth';
import type { RecoverySendCode, RecoveryVerifyCode, RecoveryChangePassword } from '@/entities/user';
import type { Error } from '@/api/types';

// Рефакторинг
const Recovery = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RecoveryChangePassword>();

    const router = useRouter();

    const [step, setStep] = React.useState<number>(1);
    const [showErrors, setShowErrors] = React.useState<boolean>(false);

    const { alertNotify } = useAlert();

    const mutationSendCode = useMutation({
        mutationFn: recoverySendCode,
        onSuccess: () => {
            alertNotify('Успешно', 'Для восстановления пароля вам отправлен код подтверждения', 'success');
            setStep(2);
            setShowErrors(false);
        },
        onError: (error: AxiosError<Error>) => {
            alertNotify('Ошибка', error?.response?.data?.message || 'Произошла ошибка, попробуйте позже', 'error');
        },
    });

    const mutationVerifyCode = useMutation({
        mutationFn: recoveryVerifyCode,
        onSuccess: () => {
            alertNotify('Успешно', 'Придумайте новый пароль', 'success');
            setStep(3);
        },
        onError: (error: AxiosError<Error>) => {
            alertNotify('Ошибка', error?.response?.data?.message || 'Произошла ошибка, попробуйте позже', 'error');
        },
    });

    const mutationChangePassword = useMutation({
        mutationFn: recoveryChangePassword,
        onSuccess: () => {
            alertNotify('Успешно', 'Пароль изменен', 'success');
            router.push('login');
        },
        onError: (error: AxiosError<Error>) => {
            alertNotify('Ошибка', error?.response?.data?.message || 'Произошла ошибка, попробуйте позже', 'error');
        },
    });

    const onSubmit: SubmitHandler<RecoveryChangePassword> = (data) => {
        if (step === 1) {
            mutationSendCode.mutate(data);
        } else if (step === 2) {
            mutationVerifyCode.mutate(data);
        } else {
            mutationChangePassword.mutate(data);
        }
    };

    return (
        <AuthFormsWrapper>
            <form onSubmit={handleSubmit(onSubmit)} className={auth.form}>
                <div className={auth.titleInner}>
                    {step > 1 && <BackButton onClick={() => setStep(1)} />}

                    <Text variant="h2">Восстановление пароля</Text>
                </div>

                <div className={cn(auth.contentWrapper, base.baseWrapperGap12)}>
                    {step === 1 && (
                        <Input
                            {...register('nickname', {
                                required: {
                                    value: true,
                                    message: 'Обязательное поле',
                                },
                                minLength: {
                                    value: 3,
                                    message: 'Никнейм должен быть больше 3 символов',
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Максимальная длина никнейма 20 символов',
                                },
                            })}
                            title="Никнейм"
                            isError={!!errors.nickname}
                            errorMessage={errors.nickname?.message}
                        />
                    )}

                    {step === 2 && (
                        <Input
                            {...register('code', {
                                required: {
                                    value: true,
                                    message: 'Обязательное поле',
                                },
                                pattern: {
                                    value: /^[0-9]{6}$/,
                                    message: 'Код подтверждения должен состоять из 6 цифр',
                                },
                            })}
                            title="Код подтверждения"
                            isError={!!errors.code}
                            errorMessage={errors.code?.message}
                            lengthLimit={6}
                        />
                    )}

                    {step === 3 && (
                        <Input
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Обязательное поле',
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Пароль не может быть меньше 8 символов',
                                },
                                maxLength: {
                                    value: 32,
                                    message: 'Максимальная длина пароля 32 символа',
                                },
                            })}
                            type="password"
                            title="Новый пароль"
                            isError={!!errors.password}
                            errorMessage={errors.password?.message}
                            trackLength
                            lengthLimit={32}
                            value={watch('password')}
                        />
                    )}
                </div>

                <div className={auth.contentBottomInner}>
                    {step === 1 && (
                        <Button loading={mutationSendCode.isPending} className={auth.contentButton}>
                            Восстановить
                        </Button>
                    )}

                    {step === 2 && (
                        <Button loading={mutationVerifyCode.isPending} className={auth.contentButton}>
                            Отправить
                        </Button>
                    )}

                    {step === 3 && (
                        <Button loading={mutationChangePassword.isPending} className={auth.contentButton}>
                            Изменить пароль
                        </Button>
                    )}

                    <div className={auth.contentBottom}>
                        <p className={auth.contentBottomText}>
                            Вспомнили пароль?
                            <Link href="/login" className={auth.contentBottomLink}>
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </AuthFormsWrapper>
    );
};

export default Recovery;
