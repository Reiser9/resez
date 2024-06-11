<<<<<<< HEAD
import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

type Props = {
    icon?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'text2' | 'text3';
    textClassName?: string;
    color?: '' | 'success' | 'error' | 'grey' | 'warn';
    center?: boolean;
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Text: React.FC<Props> = ({
    icon,
    variant = 'text',
    textClassName,
    color = '',
    center = false,
    fontWeight,
    children,
    className,
    ...props
}) => {
    return (
        <div className={cn(styles.textInner, className)} {...props}>
            {icon && icon}

            <p
                className={cn(typography[variant], textClassName, styles[color], {
                    [styles.center]: center,
                })}
                style={{ fontWeight: fontWeight }}
            >
                {children}
            </p>
        </div>
    );
};

export default Text;
=======
import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

type Props = {
    icon?: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'text' | 'text2' | 'text3';
    textClassName?: string;
    color?: '' | 'success' | 'error' | 'grey' | 'warn';
    center?: boolean;
    fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Text: React.FC<Props> = ({
    icon,
    variant = 'text',
    textClassName,
    color = '',
    center = false,
    fontWeight,
    children,
    className,
    ...props
}) => {
    return (
        <div className={cn(styles.textInner, className)} {...props}>
            {icon && icon}

            <p
                className={cn(typography[variant], textClassName, styles[color], {
                    [styles.center]: center,
                })}
                style={{ fontWeight: fontWeight }}
            >
                {children}
            </p>
        </div>
    );
};

export default Text;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
