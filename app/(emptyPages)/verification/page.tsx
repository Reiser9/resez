"use client";

import React from 'react';
import { QRCode, Tooltip } from 'antd';

import auth from '@/shared/styles/auth.module.scss';

// import { initCodeData, initUser } from '../../redux/slices/user';

// import useAuth from '../../hooks/useAuth';
import useAlert from '@/shared/hooks/useAlert';
// import {socket} from '../../utils/socket';

import { useAppDispatch } from '@/shared/hooks/useRedux';
import { useThemeContext } from '@/shared/context/ThemeProvider';
import { AuthFormsWrapper } from '@/shared/wrappers/AuthFormsWrapper';
import {Button} from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const ConfirmCode = () => {
    // const {verificationCodeData} = useSelector(state => state.user);

    const [qrExpired, setQrExpired] = React.useState<boolean>(false);
    // const [remainingTime, setRemainingTime] = React.useState<number>(verificationCodeData?.lifetime / 1000);
    const [link, setLink] = React.useState<string>("");

    // const {isLoading, logout, sendVerificationCode} = useAuth();
    const {alertNotify} = useAlert();
    const dispatch = useAppDispatch();
    const {theme} = useThemeContext();

    // const refreshQr = () => {
    //     sendVerificationCode(() => setQrExpired(false));
    // }
    
    // React.useEffect(() => {
    //     const timer = setInterval(() => {
    //         setRemainingTime(prevTime => prevTime - 1);
    //     }, 1000);
      
    //     if (remainingTime === 0) {
    //         clearInterval(timer);
    //         setQrExpired(true);
    //     }
      
    //     return () => clearInterval(timer);
    // }, [remainingTime]);

    // React.useEffect(() => {
    //     sendVerificationCode();
        
    //     socket.on("verify", (data) => {
    //         dispatch(initUser(data.user));
    //         alertNotify("Успешно", "Аккаунт верифицирован", "success");
    //     });

    //     socket.on("verificationCodeUpdated", (data) => {
    //         dispatch(initCodeData(data.verificationCodeData));
    //     });

    //     return () => {
    //         socket.off("verify");
    //         socket.off("verificationCodeUpdated");
    //     };
    // }, []);

    // React.useEffect(() => {
    //     setLink(`${process.env.REACT_APP_BOT_LINK}?start=${verificationCodeData?.code}`);
    //     setRemainingTime(verificationCodeData.lifetime / 1000);
    // }, [verificationCodeData]);

    return (
        <AuthFormsWrapper>
            <Text variant="h2">Верификация аккаунта</Text>

            <Text className={auth.postText}>
                Отсканируйте QR-код, либо {qrExpired
                ? <span className={auth.linkExpired}>перейдите по ссылке</span>
                : <a href={link} target="_blanc">перейдите по ссылке</a>} и следуйте инструкциям
            </Text>

            <div className={auth.verifyItem}>
                <QRCode
                    errorLevel="H"
                    value="resez.ru"
                    icon="img/logo-circle.svg"
                    iconSize={38}
                    color={theme === 'dark' ? '#fff' : '#000'}
                    // status={isLoading ? "loading" : qrExpired ? "expired" : "active"}
                    // onRefresh={refreshQr}
                />
            </div>

            <div className={auth.contentBottomInner}>
                <Button loading={false} color="danger" variant="empty" className={auth.contentButton}>Выйти</Button>
            </div>
        </AuthFormsWrapper>
    )
}

export default ConfirmCode;