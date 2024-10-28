'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useAchievement } from '@/features/user';

const WpAdminPage = () => {
    const router = useRouter();

    const { completeSecretAchievement } = useAchievement();

    React.useEffect(() => {
        completeSecretAchievement();
        router.push('/');
    }, []);
};

export default WpAdminPage;
