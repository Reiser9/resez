'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { ArrowLeft } from '@/shared/icons';

const BackButton = ({ ...props }) => {
    const router = useRouter();

    return (
        <button className={styles.back} onClick={() => router.back()} {...props}>
            <ArrowLeft />
        </button>
    );
};

export default BackButton;
