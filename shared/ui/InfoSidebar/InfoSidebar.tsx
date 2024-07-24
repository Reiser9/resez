import React from 'react';

import styles from './index.module.scss';

import InnerSidebar from '../InnerPageSidebar/InnerPageSidebar';
import { Info } from '@/shared/icons';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    children: React.ReactNode;
};

const InfoSidebar: React.FC<Props> = ({ value, setValue, children, ...props }) => {
    return (
        <InnerSidebar value={value} setValue={setValue} icon={<Info />} className={styles.taskSidebar} big {...props}>
            {children}
        </InnerSidebar>
    );
};

export default InfoSidebar;
