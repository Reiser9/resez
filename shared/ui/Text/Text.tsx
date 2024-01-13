import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

type Props = {
    icon?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'text2' | 'text3';
    textClassName?: string;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Text: React.FC<Props> = ({ icon, variant = 'text', textClassName, children, className, ...props }) => {
    return (
        <div className={cn(styles.textInner, className)} {...props}>
            {icon && icon}

            <p className={cn(typography[variant], textClassName)}>{children}</p>
        </div>
    );
};

export default Text;
