'use client';

import React from 'react';
import { redirect } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { Preloader } from '@/shared/ui/Preloader';

const NoAuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { appIsLoading, authIsLoading } = useAppSelector((state) => state.app);
    const isAuth = useAppSelector((state) => state.user.isAuth);

    if (appIsLoading || authIsLoading) {
        return <Preloader fill />;
    }

    if (isAuth) {
        redirect('/');
    }

    return children;
};

export default NoAuthWrapper;
