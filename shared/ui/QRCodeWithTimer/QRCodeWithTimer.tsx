'use client';

import React from 'react';
import { QRCode } from 'antd';

import styles from './index.module.scss';

import { useThemeContext } from '@/shared/context/ThemeProvider';

import { Text } from '../Text';

type Props = {
    link: string;
    qrExpired: boolean;
    remainingTime: number;
    loading?: boolean;
    onRefresh?: () => void;
};

const QRCodeWithTimer: React.FC<Props> = ({
    link,
    qrExpired,
    remainingTime,
    loading = false,
    onRefresh = () => {},
}) => {
    const { theme } = useThemeContext();

    return (
        <div className={styles.qrcodeWrapper}>
            <QRCode
                errorLevel="H"
                value={link}
                icon="/img/logo-circle.svg"
                iconSize={38}
                color={theme === 'dark' ? '#fff' : '#000'}
                status={loading ? 'loading' : qrExpired ? 'expired' : 'active'}
                onRefresh={onRefresh}
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
