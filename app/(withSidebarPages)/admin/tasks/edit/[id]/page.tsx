'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const AdminTaskEdit = () => {
    const { id } = useParams();

    return <div>AdminTaskEdit {id}</div>;
};

export default AdminTaskEdit;
