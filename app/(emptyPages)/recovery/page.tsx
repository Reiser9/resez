'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

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

const RememberedPassword = () => {
    return (
        <div className={auth.contentBottom}>
            <p className={auth.contentBottomText}>
                Вспомнили пароль?
                <Link href="/login" className={auth.contentBottomLink}>
                    Войти
                </Link>
            </p>
        </div>
    );
};

const Recovery = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<RecoveryChangePassword>();

    const router = useRouter();

    const [step, setStep] = React.useState<number>(1);
    const [nickname, setNickname] = React.useState<string>('');
    const [code, setCode] = React.useState<string>('');

    const { alertNotify } = useAlert();

    const mutationSendCode = useMutation({
        mutationFn: recoverySendCode,
        onSuccess: () => {
            alertNotify('Успешно', 'Для восстановления пароля вам отправлен код подтверждения', 'success');
            setStep(2);
            setNickname(watch('nickname'));
            reset();
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
            setCode(watch('code'));
            reset();
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

    const onSubmitSendCode: SubmitHandler<RecoverySendCode> = (data) => {
        mutationSendCode.mutate(data);
    };

    const onSubmitVerifyCode: SubmitHandler<RecoveryVerifyCode> = (data) => {
        mutationVerifyCode.mutate({ ...data, nickname });
    };

    const onSubmitChangePassword: SubmitHandler<RecoveryChangePassword> = (data) => {
        mutationChangePassword.mutate({ ...data, nickname, code });
    };

    return (
        <AuthFormsWrapper>
            <div className={auth.form}>
                <div className={auth.titleInner}>
                    {step > 1 && <BackButton disabled={mutationVerifyCode.isPending || mutationChangePassword.isPending} onClick={() => setStep(1)} />}

                    <Text variant="h2">Восстановление пароля</Text>
                </div>

                {step === 1 && (
                    <form onSubmit={handleSubmit(onSubmitSendCode)} className={auth.formWrapper}>
                        <div className={cn(auth.contentWrapper, base.baseWrapperGap12)}>
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
                        </div>

                        <div className={auth.contentBottomInner}>
                            <Button loading={mutationSendCode.isPending} className={auth.contentButton}>
                                Восстановить
                            </Button>

                            <RememberedPassword />
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmit(onSubmitVerifyCode)} className={auth.formWrapper}>
                        <div className={cn(auth.contentWrapper, base.baseWrapperGap12)}>
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
                        </div>

                        <div className={auth.contentBottomInner}>
                            <Button loading={mutationVerifyCode.isPending} className={auth.contentButton}>
                                Отправить
                            </Button>

                            <RememberedPassword />
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleSubmit(onSubmitChangePassword)} className={auth.formWrapper}>
                        <div className={cn(auth.contentWrapper, base.baseWrapperGap12)}>
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
                        </div>

                        <div className={auth.contentBottomInner}>
                            <Button loading={mutationChangePassword.isPending} className={auth.contentButton}>
                                Изменить пароль
                            </Button>

                            <RememberedPassword />
                        </div>
                    </form>
                )}
            </div>
        </AuthFormsWrapper>
    );
};

export default Recovery;
