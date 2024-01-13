'use client';

import React from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';

import auth from '@/shared/styles/auth.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthFormsWrapper } from '@/shared/wrappers/AuthFormsWrapper';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { useRegister } from '@/features/user';
import type { RegisterData } from '@/entities/user';

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterData>();

    const mutation = useRegister();

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        mutation.mutate(data);
    };

    return (
        <AuthFormsWrapper>
            <form onSubmit={handleSubmit(onSubmit)} className={auth.form}>
                <Text variant="h2">Регистрация</Text>

                <Text className={auth.contentInnerText}>Все поля обязательны к заполнению</Text>

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
                            pattern: {
                                value: /^[a-zA-Z0-9._]+$/,
                                message: 'Никнейм может содержать только латинские буквы, цифры и _',
                            },
                        })}
                        title="Придумайте никнейм"
                        isError={!!errors.nickname}
                        errorMessage={errors.nickname?.message}
                        infoText="При выборе никнейма учтите, что вы не сможете его больше сменить"
                        trackLength
                        lengthLimit={20}
                        value={watch('nickname')}
                    />

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
                        title="Придумайте пароль"
                        type="password"
                        isError={!!errors.password}
                        errorMessage={errors.password?.message}
                        trackLength
                        lengthLimit={32}
                        value={watch('password')}
                    />
                </div>

                <Text variant="text2" className={auth.agreeLabel}>
                    При регистрации вы соглашаетесь с <Link href="/docs/rules">правилами проекта</Link> и{' '}
                    <Link href="/docs/publicoffer">публичной офертой</Link>
                </Text>

                <div className={auth.contentBottomInner}>
                    <Button loading={mutation.isPending} className={auth.contentButton}>
                        Зарегистрироваться
                    </Button>

                    <div className={auth.contentBottom}>
                        <p className={auth.contentBottomText}>
                            Есть аккаунт?
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

export default Login;
