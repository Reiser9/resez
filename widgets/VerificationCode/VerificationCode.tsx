'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import auth from '@/shared/styles/auth.module.scss';

import type { User } from '@/entities/user';

import useAlert from '@/shared/hooks/useAlert';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';
import { socket } from '@/api/socket';
import { AuthFormsWrapper } from '@/shared/wrappers/AuthFormsWrapper';
import { initVerificationCodeData } from '@/store/slices/user';
import { useLogout, useVerificationCode } from '@/features/user';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { QRCodeWithTimer, useQRCodeState } from '@/shared/ui/QRCodeWithTimer';

const ConfirmCode = () => {
    const [link, setLink] = React.useState('https://resez.ru');

    const router = useRouter();

    const verificationCodeData = useAppSelector((state) => state.user.verificationCodeData);
    const dispatch = useAppDispatch();

    const { alertNotify } = useAlert();
    const { isLoading, sendVerificationCode } = useVerificationCode();
    const { isLoading: logoutLoading, logout } = useLogout();

    const { remainingTime, qrExpired, resetTime, setQrExpired } = useQRCodeState(
        (verificationCodeData?.lifetime || 0) / 1000,
        () => setLink('https://resez.ru'),
    );

    const refreshQr = async () => {
        await sendVerificationCode();
        resetTime((verificationCodeData?.lifetime || 0) / 1000);
        setQrExpired(false);
    };

    React.useEffect(() => {
        if (verificationCodeData?.lifetime) {
            resetTime(verificationCodeData.lifetime / 1000);
        }
    }, [verificationCodeData, resetTime]);

    React.useEffect(() => {
        if (verificationCodeData) {
            setLink(`${process.env.NEXT_PUBLIC_BOT_LINK}?start=${verificationCodeData.code}`);
        }
    }, [verificationCodeData]);

    React.useEffect(() => {
        router.push('/');
        if (!verificationCodeData) {
            sendVerificationCode();
        }

        socket.on('verify', (data: { user: User }) => {
            dispatch(initVerificationCodeData(null));
            alertNotify('Успешно', 'Аккаунт верифицирован', 'success');
        });

        socket.on('verify-code-updated', (data: any) => {
            dispatch(initVerificationCodeData(data.verificationCodeData));
        });

        return () => {
            socket.off('verify');
            socket.off('verify-code-updated');
        };
    }, []);

    return (
        <AuthFormsWrapper>
            <Text variant="h2">Верификация аккаунта</Text>

            <Text className={auth.postText}>
                Отсканируйте QR-код, либо{' '}
                {qrExpired ? (
                    <span className={auth.linkExpired}>перейдите по ссылке</span>
                ) : (
                    <a href={link} target="_blanc">
                        перейдите по ссылке
                    </a>
                )}{' '}
                и следуйте инструкциям
            </Text>

            {qrExpired && (
                <Text className={auth.postText} color="error">
                    Ссылка недействительна, обновите QR-код
                </Text>
            )}

            <div className={auth.verifyItem}>
                <QRCodeWithTimer
                    link={link}
                    remainingTime={remainingTime}
                    qrExpired={qrExpired}
                    onRefresh={refreshQr}
                    loading={isLoading}
                />
            </div>

            <div className={auth.contentBottomInner}>
                <Button
                    loading={logoutLoading}
                    color="danger"
                    variant="light"
                    className={auth.contentButton}
                    onClick={() => logout()}
                >
                    Выйти
                </Button>
            </div>
        </AuthFormsWrapper>
    );
};

export default ConfirmCode;
