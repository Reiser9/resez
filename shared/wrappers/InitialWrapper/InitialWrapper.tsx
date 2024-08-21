'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import useSocket from '@/shared/hooks/useSocket';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { VerificationCode } from '@/widgets/VerificationCode';
import { useCheckAuth } from '@/features/user';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Preloader } from '@/shared/ui/Preloader';
import { ServerNotAvailable } from '@/shared/ui/ServerNotAvailable';
import { Ban } from '@/shared/ui/Ban';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    useCheckAuth();
    useSocket();

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { appIsLoading, serverIsAvailable } = useAppSelector((state) => state.app);

    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth
    });

    const { isBlocked, isVerified } = user?.user || {};

    if (appIsLoading || userIsLoading) {
        return <Preloader />;
    }

    if (!serverIsAvailable) {
        return <ServerNotAvailable />;
    }

    if (isBlocked) {
        return <Ban />;
    }

    if (isAuth && !isVerified) {
        return <VerificationCode />;
    }

    return children;
};

export default InitialWrapper;
