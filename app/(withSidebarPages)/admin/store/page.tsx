"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const AdminStore = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.replace('/admin/store/products/avatar');
    }, []);
};

export default AdminStore;
