'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const PersonalizationPage = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/personalization/avatar');
    }, []);
};

export default PersonalizationPage;
