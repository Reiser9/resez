'use client';

import React from 'react';
import { QRCode } from 'antd';

import styles from './index.module.scss';

import { useThemeContext } from '@/shared/context/ThemeProvider';
import useQRCodeState from './useQRCodeState';
import { Text } from '../Text';

type Props = {
    link: string;
    initialTime: number;
    loading?: boolean;
    onExpire?: () => void;
    onRefresh?: () => void;
};

const QRCodeWithTimer: React.FC<Props> = ({ link, initialTime, loading = false, onExpire, onRefresh }) => {
    const { theme } = useThemeContext();
    const { remainingTime, qrExpired, resetTime, setQrExpired } = useQRCodeState(initialTime, onExpire);

    React.useEffect(() => {
        resetTime(initialTime);
    }, [initialTime, resetTime]);

    return (
        <div className={styles.qrcodeWrapper}>
            <QRCode
                errorLevel="H"
                value={link}
                icon="/img/logo-circle.svg"
                iconSize={38}
                color={theme === 'dark' ? '#fff' : '#000'}
                status={loading ? 'loading' : qrExpired ? 'expired' : 'active'}
                onRefresh={() => {
                    onRefresh && onRefresh();
                    resetTime(initialTime);
                    setQrExpired(false);
                }}
                type="svg"
            />

            {!!remainingTime && (
                <Text fontWeight={600} variant="text2">
                    Истечет через: {remainingTime} сек.
                </Text>
            )}
        </div>
    );
};

export default QRCodeWithTimer;
