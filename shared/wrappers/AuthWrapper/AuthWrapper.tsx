'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { Preloader } from '@/shared/ui/Preloader';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { appIsLoading, authIsLoading } = useAppSelector((state) => state.app);
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        if (!appIsLoading && !authIsLoading) {
            if (!isAuth) {
                router.push(`/login?callUrl=${pathname}`);
            }
        }
        
    }, [appIsLoading, authIsLoading, isAuth, router, pathname]);

    if (appIsLoading || authIsLoading) {
        return <Preloader fill />;
    }

    return isAuth ? children : null;
};

export default AuthWrapper;
