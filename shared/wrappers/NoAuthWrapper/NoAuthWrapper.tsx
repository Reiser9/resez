"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { Preloader } from '@/shared/ui/Preloader';

const NoAuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const {appIsLoading, authIsLoading} = useAppSelector(state => state.app);
    const isAuth = useAppSelector(state => state.user.isAuth);
    const router = useRouter();

    React.useEffect(() => {
        if(!appIsLoading && !authIsLoading && isAuth){
            router.push("/");
        }
    }, [appIsLoading, authIsLoading, isAuth, router]);

    if(appIsLoading || authIsLoading){
        return <Preloader fill />
    }

    return !isAuth ? children : null;
};

export default NoAuthWrapper;
