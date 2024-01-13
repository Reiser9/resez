'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { QRCode } from 'antd';

import auth from '@/shared/styles/auth.module.scss';
import base from '@/shared/styles/base.module.scss';

import { AuthFormsWrapper } from '@/shared/wrappers/AuthFormsWrapper';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { useLogin } from '@/features/user';
import type { LoginData } from '@/entities/user';
import { socket } from '@/api/socket';

const Login = () => {
    const [uniqId, setUniqId] = React.useState<string>("")

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const { theme } = useThemeContext();

    const mutation = useLogin();

    const onSubmit: SubmitHandler<LoginData> = (data) => {
        mutation.mutate(data);
    };

    React.useEffect(() => {
        const localUniqId = localStorage.getItem("uniqueId");

        if(localUniqId){
            setUniqId(localUniqId);
        }
    }, []);

    React.useEffect(() => {
        socket.on("auth", (data) => {
            console.log(data);
        });

        return () => {
            socket.off("auth");
        }
    }, []);

    return (
        <AuthFormsWrapper>
            <form onSubmit={handleSubmit(onSubmit)} className={auth.form}>
                <Text variant="h2">Вход</Text>

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
                        })}
                        title="Никнейм"
                        isError={!!errors.nickname}
                        errorMessage={errors.nickname?.message}
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
                        title="Пароль"
                        type="password"
                        isError={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                </div>

                <Link href="/recovery" className={auth.link}>
                    Забыли пароль?
                </Link>

                <div className={auth.alternativeBlock}>
                    <p className={auth.alternativeText}>
                        <span>Быстрый вход по QR‑коду</span>
                    </p>

                    <QRCode
                        color={theme === 'dark' ? '#fff' : '#000'}
                        errorLevel="H"
                        value={`${process.env.NEXT_PUBLIC_BOT_LINK}?start=${uniqId}`}
                        icon="img/logo-circle.svg"
                        size={140}
                        iconSize={38}
                    />
                </div>

                <div className={auth.contentBottomInner}>
                    <Button loading={mutation.isPending} className={auth.contentButton}>
                        Войти
                    </Button>

                    <div className={auth.contentBottom}>
                        <p className={auth.contentBottomText}>
                            Нет аккаунта?
                            <Link href="/register" className={auth.contentBottomLink}>
                                Зарегистрироваться
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </AuthFormsWrapper>
    );
};

export default Login;
