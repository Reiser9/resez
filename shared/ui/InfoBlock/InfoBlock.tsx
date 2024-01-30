import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

type Props = {
    icon?: React.ReactNode;
    title?: string;
    text?: string;
    image?: React.ReactNode;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const InfoBlock: React.FC<Props> = ({ title, text, icon, image, children, className, ...props }) => {
    return (
        <div className={cn(styles.testWelcomeWrapper, className)} {...props}>
            <div className={styles.testWelcome}>
                {icon && <div className={styles.testWelcomeIconInner}>{icon}</div>}

                <div className={styles.testWelcomeTextInner}>
                    {title && <p className={typography.h4}>{title}</p>}

                    {text && <p className={typography.text2}>{text}</p>}

                    {children}
                </div>

                {image && <div className={styles.testWelcomeIcon}>{image}</div>}
            </div>
        </div>
    );
};

export default InfoBlock;
