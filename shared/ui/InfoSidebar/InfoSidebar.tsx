'use client';

import React from 'react';

import styles from './index.module.scss';

import InnerPageSidebar from '../InnerPageSidebar/InnerPageSidebar';
import { Info } from '@/shared/icons';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    children: React.ReactNode;
};

const InfoSidebar: React.FC<Props> = ({ value, setValue, children, ...props }) => {
    return (
        <InnerPageSidebar
            value={value}
            setValue={setValue}
            icon={<Info />}
            className={styles.taskSidebar}
            big
            {...props}
        >
            {children}
        </InnerPageSidebar>
    );
};

export default InfoSidebar;
