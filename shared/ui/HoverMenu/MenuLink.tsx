import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    danger?: boolean;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const MenuLink: React.FC<Props> = ({ danger = false, disabled = false, className, children, ...props }) => {
    return (
        <div
            className={cn(styles.hoverMenuLink, className, {
                [styles.delete]: danger,
                [styles.disabled]: disabled,
            })}
            {...props}
        >
            {children}
        </div>
    );
};

export default MenuLink;
