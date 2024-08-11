'use client';

import React from 'react';

export const useCountdown = (start: number, interval: number = 1000, onComplete?: () => void) => {
    const [remainingTime, setRemainingTime] = React.useState(start);
    const [isPaused, setIsPaused] = React.useState(false);
    const savedCallback = React.useRef<() => void>();

    React.useEffect(() => {
        savedCallback.current = () => {
            setRemainingTime((prev) => {
                if (prev > 1) {
                    return prev - 1;
                } else {
                    setIsPaused(true);
                    onComplete?.();
                    return 0;
                }
            });
        };
    }, [onComplete]);

    React.useEffect(() => {
        if (!isPaused && remainingTime > 0) {
            const tick = () => {
                if (savedCallback.current) {
                    savedCallback.current();
                }
            };
            const id = setInterval(tick, interval);
            return () => clearInterval(id);
        }
    }, [isPaused, remainingTime, interval]);

    const pause = React.useCallback(() => {
        setIsPaused(true);
    }, []);

    const resume = React.useCallback(() => {
        if (remainingTime > 0) {
            setIsPaused(false);
        }
    }, [remainingTime]);

    const reset = React.useCallback(() => {
        setRemainingTime(start);
        setIsPaused(false);
    }, [start]);

    React.useEffect(() => {
        if (start) {
            setRemainingTime(start);
        }
    }, [start]);

    return {
        elapsedTime: start - remainingTime,
        remainingTime,
        isPaused,
        pause,
        resume,
        reset,
    };
};
