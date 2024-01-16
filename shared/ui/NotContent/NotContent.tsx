import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Text } from '../Text';
import { Data } from '@/shared/icons';

type Props = {
    text?: string;
    icon?: React.ReactNode;
    danger?: boolean;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const NotContent: React.FC<Props> = ({ text, icon, danger = false, children, ...props }) => {
    return (
        <div
            className={cn(styles.emptyContent, {
                [styles.danger]: danger,
            })}
            {...props}
        >
            <div className={styles.emptyImgInner}>{icon ? icon : <Data />}</div>

            {text && <Text variant="text2">{text}</Text>}

            {children}
        </div>
    );
};

export default NotContent;
