'use client';

import cn from 'classnames';
import { HTMLAttributes } from 'react';

import styles from './index.module.scss';

type Props = {
    theme?: 'primary' | 'danger';
    small?: boolean;
    fill?: boolean;
    page?: boolean;
    offIndent?: boolean;
    animationDuration?: number;
    wrapperClassName?: string;
} & HTMLAttributes<HTMLDivElement>;

const Preloader: React.FC<Props> = ({
    theme = 'primary',
    small = false,
    fill = false,
    page = false,
    offIndent = false,
    animationDuration = 1,
    className,
    wrapperClassName,
    ...props
}) => {
    return (
        <div
            className={cn(styles.preloaderInner, wrapperClassName, {
                [styles.fill]: fill,
                [styles.page]: page,
                [styles.indent]: offIndent,
            })}
            {...props}
        >
            <div
                className={cn(styles.preloader, className, styles[theme], {
                    [styles.small]: small,
                })}
                style={{ animationDuration: `${animationDuration}s` }}
            ></div>
        </div>
    );
};

export default Preloader;
