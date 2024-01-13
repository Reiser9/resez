'use client';

import React, { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import styles from './index.module.scss';

type Props = {
    href: string;
    disabled?: boolean;
    end?: boolean;
    children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const SidebarLink: React.FC<Props> = ({ href, disabled = false, end = false, className, children, ...props }) => {
    const pathname = usePathname();

    return (
        <Link
            href={href}
            className={cn(styles.sidebarLink, className, {
                [styles.disabled]: disabled,
                [styles.active]: end ? pathname === href : pathname.startsWith(href),
            })}
            {...props}
        >
            {children}
        </Link>
    );
};

export default SidebarLink;
