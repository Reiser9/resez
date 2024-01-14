'use client';

import React from 'react';

import useSocket from '@/shared/hooks/useSocket';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Ban } from '@/shared/ui/Ban';
import { VerificationCode } from '@/shared/ui/VerificationCode';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuth } = useAppSelector((state) => state.user);

    useSocket();

    if (user?.isBlocked) {
        return <Ban />;
    }

    if(isAuth && !user?.isVerified){
        return <VerificationCode />;
    }

    return children;
};

export default InitialWrapper;
