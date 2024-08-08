'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

const AdminUserById = () => {
    const { id } = useParams();

    return <div>AdminUserById {id}</div>;
};

export default AdminUserById;
