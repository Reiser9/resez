'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AdminArchive = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/admin/archive/subjects');
    }, []);
};

export default AdminArchive;
