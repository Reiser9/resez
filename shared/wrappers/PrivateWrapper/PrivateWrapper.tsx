'use client';

import React from 'react';
import { redirect } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { checkPermission } from '@/shared/utils/checkPermissions';

import { Preloader } from '@/shared/ui/Preloader';
import { useUserPermissions } from '@/features/user';

const PrivateWrapper = ({ permissions = [], children }: { permissions: string[]; children: React.ReactNode }) => {
    const { appIsLoading, authIsLoading } = useAppSelector((state) => state.app);
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getUserPermissions } = useUserPermissions();

    const { data: userPermission, isLoading: permissionsIsLoading } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
        enabled: isAuth,
    });

    if (appIsLoading || authIsLoading || permissionsIsLoading) {
        return <Preloader fill />;
    }

    if (!isAuth || !checkPermission(userPermission || [], permissions)) {
        return redirect('/404');
    }

    return children;
};

export default PrivateWrapper;
