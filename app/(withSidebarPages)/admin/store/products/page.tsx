"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const AdminStoreProducts = () => {
    const router = useRouter();

    React.useEffect(() => {
        router.push('/admin/store/products/avatar');
    }, []);
};

export default AdminStoreProducts;
