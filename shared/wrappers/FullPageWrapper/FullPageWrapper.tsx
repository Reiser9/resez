import React from 'react';
import parse from 'html-react-parser';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

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

                <p className={cn(typography.h4, styles.fullPageText)}>{text}</p>

                {children}
            </div>
        </div>
    );
};

export default FullPage;
