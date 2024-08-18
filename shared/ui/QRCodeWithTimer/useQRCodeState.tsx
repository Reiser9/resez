'use client';

import React from 'react';

const useQRCodeState = (initialTime: number, onExpire?: () => void) => {
    const [remainingTime, setRemainingTime] = React.useState(initialTime);
    const [qrExpired, setQrExpired] = React.useState(false);

    React.useEffect(() => {
        if (remainingTime <= 0) {
            setQrExpired(true);
            onExpire && onExpire();
            return;
        }

        const timer = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [remainingTime, onExpire]);

    React.useEffect(() => {
        setRemainingTime(initialTime);
        setQrExpired(false);
    }, [initialTime]);

    return { remainingTime, qrExpired, setQrExpired, resetTime: setRemainingTime };
};

export default useQRCodeState;
