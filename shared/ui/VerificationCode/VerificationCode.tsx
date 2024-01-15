'use client';

import React from 'react';
import { QRCode } from 'antd';
import { useRouter } from 'next/navigation';

import auth from '@/shared/styles/auth.module.scss';

// import { initCodeData, initUser } from '../../redux/slices/user';

// import useAuth from '../../hooks/useAuth';
import useAlert from '@/shared/hooks/useAlert';
import { socket } from '@/api/socket';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/useRedux';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { AuthFormsWrapper } from '@/shared/wrappers/AuthFormsWrapper';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { initUser, initVerificationCodeData } from '@/store/slices/user';
import { useLogout, useVerificationCode } from '@/features/user';
import { VerificationCodeData } from '@/entities/user';

const ConfirmCode = () => {
    const { verificationCodeData } = useAppSelector((state) => state.user);
    const router = useRouter();

    const [qrExpired, setQrExpired] = React.useState<boolean>(false);
    const [remainingTime, setRemainingTime] = React.useState<number>(0);
    const [link, setLink] = React.useState<string>('https://resez.ru');

    const dispatch = useAppDispatch();
    const { alertNotify } = useAlert();
    const { isLoading, sendVerificationCode } = useVerificationCode();
    const { logout } = useLogout();
    const { theme } = useThemeContext();

    const refreshQr = () => {
        sendVerificationCode(() => setQrExpired(false));
    };

    React.useEffect(() => {
        if (verificationCodeData) {
            setRemainingTime(verificationCodeData?.lifetime / 1000);
        }
    }, [verificationCodeData]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        if (remainingTime === 0) {
            clearInterval(timer);
            setQrExpired(true);
        }

        return () => clearInterval(timer);
    }, [remainingTime]);

    React.useEffect(() => {
        router.push('/');
        if (!verificationCodeData) {
            sendVerificationCode();
        }

        socket.on('verify', (data) => {
            dispatch(initUser(data.user));
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

    React.useEffect(() => {
        if (verificationCodeData) {
            setLink(`${process.env.NEXT_PUBLIC_BOT_LINK}?start=${verificationCodeData?.code}`);
            setRemainingTime(verificationCodeData?.lifetime / 1000);
            setQrExpired(false);
        }
    }, [verificationCodeData]);

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

            <div className={auth.verifyItem}>
                <QRCode
                    errorLevel="H"
                    value={link}
                    icon="img/logo-circle.svg"
                    iconSize={38}
                    color={theme === 'dark' ? '#fff' : '#000'}
                    status={isLoading ? 'loading' : qrExpired ? 'expired' : 'active'}
                    onRefresh={refreshQr}
                />
            </div>

            <a href={link}>{link}</a>
            <div>{remainingTime}</div>

            <div className={auth.contentBottomInner}>
                <Button loading={isLoading} color="danger" variant="empty" className={auth.contentButton} onClick={() => logout()}>
                    Выйти
                </Button>
            </div>
        </AuthFormsWrapper>
    );
};

export default ConfirmCode;
