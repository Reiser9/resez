'use client';

import React from 'react';

import { Preloader } from '@/shared/ui/Preloader';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { redirect } from 'next/navigation';
import { checkPermission } from '@/shared/utils/checkPermissions';

const PrivateWrapper = ({ permissions = [], children }: { permissions: string[]; children: React.ReactNode }) => {
    const { appIsLoading, authIsLoading } = useAppSelector((state) => state.app);
    const { isAuth, user } = useAppSelector((state) => state.user);

    if (appIsLoading || authIsLoading) {
        return <Preloader fill />;
    }

    if (!isAuth || !user || !checkPermission(user.permissions, permissions)) {
        return redirect('/404');
    }

    return children;
};

export default PrivateWrapper;
