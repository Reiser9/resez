import React, { AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { ArrowRightLong } from '@/shared/icons';

type Props = {
    title: string;
    titleVariant?: 'h4' | 'text';
    text?: string;
    href: string;
    disabled?: boolean;
    children?: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const LinkBlock: React.FC<Props> = ({
    title,
    titleVariant = 'h4',
    text,
    href,
    disabled = false,
    className,
    children,
    ...props
}) => {
    return (
        <Link
            href={href}
            className={cn(styles.trainingItem, className, {
                [styles.disabled]: disabled,
            })}
            {...props}
        >
            <span className={styles.trainingItemTitleInner}>
                <p className={cn(typography[titleVariant], styles.trainingItemTitle)}>{title}</p>

                <span className={styles.trainingItemArrow}>
                    <ArrowRightLong />
                </span>
            </span>

            {text && <p className={typography.text2}>{text}</p>}

            {children && <span className={styles.cardLinkImgInner}>{children}</span>}
        </Link>
    );
};

export default LinkBlock;
