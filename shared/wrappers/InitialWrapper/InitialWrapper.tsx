'use client';

import React from 'react';

import useSocket from '@/shared/hooks/useSocket';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Ban } from '@/shared/ui/Ban';
import { VerificationCode } from '@/shared/ui/VerificationCode';
import { useCheckAuth } from '@/features/user';
import { Preloader } from '@/shared/ui/Preloader';
import { ServerNotAvailable } from '@/shared/ui/ServerNotAvailable';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    useCheckAuth();
    useSocket();

    const { user, isAuth } = useAppSelector((state) => state.user);
    const { appIsLoading, serverIsAvailable } = useAppSelector((state) => state.app);

    if (appIsLoading) {
        return <Preloader />;
    }

    if (!serverIsAvailable) {
        return <ServerNotAvailable />;
    }

    if (user?.isBlocked) {
        return <Ban />;
    }

    if (isAuth && !user?.isVerified) {
        return <VerificationCode />;
    }

    return children;
};

export default InitialWrapper;
