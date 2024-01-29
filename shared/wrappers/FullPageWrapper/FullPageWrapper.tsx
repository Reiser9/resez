import React from 'react';
import parse from 'html-react-parser';

import styles from './index.module.scss';

import { Text } from '@/shared/ui/Text';

type Props = {
    icon: React.ReactNode;
    code: string;
    text: string;
    children?: React.ReactNode;
};

const FullPage: React.FC<Props> = ({ icon, code, text, children }) => {
    return (
        <div className={styles.fullPage}>
            <div className={styles.fullPageContent}>
                <div className={styles.fullPageImg}>{icon}</div>

                <h2 className={styles.fullPageTitle}>{parse(code)}</h2>

                <Text variant="h4" className={styles.fullPageText}>
                    {text}
                </Text>

                {children}
            </div>
        </div>
    );
};

export default FullPage;
