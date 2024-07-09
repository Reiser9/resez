'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const StorePersonalization = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/store/personalization/avatar');
    }, []);
};

export default StorePersonalization;
