'use client';

import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { ArrowLeft } from '@/shared/icons';

type Props = {
    disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton: React.FC<Props> = ({ disabled = false, ...props }) => {
    const router = useRouter();

    return (
        <button className={cn(styles.back, {
            [styles.disabled]: disabled
        })} onClick={() => router.back()} {...props}>
            <ArrowLeft />
        </button>
    );
};

export default BackButton;
