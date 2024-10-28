'use client';

import React from 'react';
import ruRU from 'antd/locale/ru_RU';
import { useQuery } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

import useSocket from '@/shared/hooks/useSocket';
import useShortInfo from '@/features/user/data/useShortInfo';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { VerificationCode } from '@/widgets/VerificationCode';
import { useCheckAuth } from '@/features/user';
import { CONFIG } from '@/shared/consts/CONFIG';
import { setSiteColors } from '@/shared/utils/setSiteColors';

import { Preloader } from '@/shared/ui/Preloader';
import { ServerNotAvailable } from '@/shared/ui/ServerNotAvailable';
import { Ban } from '@/shared/ui/Ban';
import useBattleSocket from '@/shared/hooks/useBattleSocket';

const InitialWrapper = ({ children }: { children: React.ReactNode }) => {
    useCheckAuth();
    useSocket();
    useBattleSocket();

    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { appIsLoading, serverIsAvailable } = useAppSelector((state) => state.app);

    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { isBlocked, isVerified, theme } = user?.user || {};

    React.useEffect(() => {
        if (theme) {
            setSiteColors(theme.primary, theme.light);
        } else {
            setSiteColors();
        }
    }, [theme]);

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

    return (
        <ConfigProvider
            locale={ruRU}
            theme={{
                token: {
                    colorPrimary: theme ? theme.primary : CONFIG.BASE_COLOR,
                    fontFamily: 'Nunito, sans-serif',
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default InitialWrapper;
