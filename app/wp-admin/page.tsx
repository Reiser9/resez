'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAchievement } from '@/features/user';

const WpAdminPage = () => {
    const router = useRouter();

    const { getSecretAchievement } = useAchievement();

    React.useEffect(() => {
        getSecretAchievement();
        router.push('/');
    }, []);
};

export default WpAdminPage;
