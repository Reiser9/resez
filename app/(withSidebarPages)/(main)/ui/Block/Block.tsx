import React, { HTMLAttributes } from 'react';
import parse from 'html-react-parser';
import cn from 'classnames';
import Link from 'next/link';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { ArrowRight } from '@/shared/icons';

type Props = {
    title: string;
    tag?: 'h1' | 'h2' | 'h3';
    size?: 'big' | 'small';
    text?: string;
    icon?: React.ReactNode;
    buttonText?: string;
    href?: string;
    smallPadding?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const Block: React.FC<Props> = ({
    title,
    tag = 'h3',
    size = 'big',
    text,
    icon,
    buttonText,
    href,
    smallPadding,
    ...props
}) => {
    return (
        <div
            className={cn(styles.mainBlock, styles[size], {
                [styles.p16]: smallPadding,
            })}
            {...props}
        >
            <div className={styles.mainBlockContent}>
                <h2 className={cn(styles.mainTitle, typography[tag])}>{parse(title)}</h2>

                {text && <p className={`${typography.text} ${styles.mainSubtitle}`}>{parse(text)}</p>}

                {buttonText && href && (
                    <Link href={href} className={styles.mainBlockLink}>
                        {buttonText}

                        <ArrowRight />
                    </Link>
                )}
            </div>

            {icon && <div className={styles.mainBlockImgInner}>{icon}</div>}
        </div>
    );
};

export default Block;
