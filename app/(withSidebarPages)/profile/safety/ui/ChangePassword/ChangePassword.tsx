'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import useAlert from '@/shared/hooks/useAlert';
import { Text } from '@/shared/ui/Text';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { ChangePassword, VerifyChangePassword } from '@/entities/user';
import { useChangePassword } from '@/features/user';

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<VerifyChangePassword>();

    const [passwordChangeStep, setPasswordChangeStep] = React.useState<number>(1);

    const [oldPassword, setOldPassword] = React.useState<string>('');
    const [newPassword, setNewPassword] = React.useState<string>('');
    const [newPasswordAgain, setNewPasswordAgain] = React.useState<string>('');

    const { isLoading, changePassword, verifyChangePassword } = useChangePassword();
    const { alertNotify } = useAlert();

    const onSubmitChangePassword: SubmitHandler<ChangePassword> = (data) => {
        const { newPassword } = data;

        if (newPassword !== newPasswordAgain) {
            return alertNotify('Предупреждение', 'Пароли не совпадают', 'warn');
        }

        setOldPassword(watch('oldPassword'));
        setNewPassword(watch('newPassword'));

        changePassword(data, () => {
            setPasswordChangeStep(2);
            reset();
        });
    };

    const onSubmitVerifyChangePassword: SubmitHandler<VerifyChangePassword> = (data) => {
        verifyChangePassword({ ...data, oldPassword, newPassword }, () => {
            setPasswordChangeStep(1);
            reset();
        });
    };

    return (
        <div className={styles.contentBlock}>
            <Text variant="h3">Смена пароля</Text>

            {passwordChangeStep === 1 && (
                <form onSubmit={handleSubmit(onSubmitChangePassword)} className={base.baseWrapperGap12}>
                    <Input
                        {...register('oldPassword', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                            minLength: {
                                value: 8,
                                message: 'Пароль должен быть минимум 8 символов',
                            },
                            maxLength: {
                                value: 32,
                                message: 'Максимальная длина пароля 32 символа',
                            },
                        })}
                        type="password"
                        placeholder="Старый пароль"
                        isError={!!errors.oldPassword}
                        errorMessage={errors.oldPassword?.message}
                    />

                    <Input
                        {...register('newPassword', {
                            required: {
                                value: true,
                                message: 'Обязательное поле',
                            },
                            minLength: {
                                value: 8,
                                message: 'Пароль должен быть минимум 8 символов',
                            },
                            maxLength: {
                                value: 32,
                                message: 'Максимальная длина пароля 32 символа',
                            },
                        })}
                        type="password"
                        placeholder="Новый пароль"
                        isError={!!errors.newPassword}
                        errorMessage={errors.newPassword?.message}
                    />

                    <Input
                        type="password"
                        placeholder="Повторите новый пароль"
                        value={newPasswordAgain}
                        setValue={setNewPasswordAgain}
                    />

                    <Button loading={isLoading}>Сменить пароль</Button>
                </form>
            )}

            {passwordChangeStep === 2 && (
                <form onSubmit={handleSubmit(onSubmitVerifyChangePassword)} className={base.baseWrapperGap12}>
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
                        placeholder="Код подтверждения"
                        lengthLimit={6}
                        isError={!!errors.code}
                        errorMessage={errors.code?.message}
                    />

                    <Button type="button" variant="light" onClick={() => setPasswordChangeStep(1)} disabled={isLoading}>
                        Назад
                    </Button>

                    <Button loading={isLoading}>Отправить</Button>
                </form>
            )}
        </div>
    );
};

export default ChangePassword;
