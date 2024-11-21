'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { DynamicSkeleton } from '@/shared/ui/Skeleton';


const CustomHtmlParser = dynamic(() => import('@/shared/ui/CustomHtmlParser/CustomHtmlParser'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

type Props = {
    content: string;
};

const UsefulTaskItem: React.FC<Props> = ({ content }) => {
    return (
        <div className={styles.taskItem}>
            <div className={base.format}>
                <CustomHtmlParser html={content} />
            </div>
        </div>
    );
};

export default UsefulTaskItem;
