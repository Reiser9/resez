import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Text } from '../Text';
import { Data } from '@/shared/icons';

type Props = {
    text?: string;
    icon?: React.ReactNode;
    danger?: boolean;
    small?: boolean;
    children?: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const NotContent: React.FC<Props> = ({ text, icon, danger = false, small = false, children, ...props }) => {
    return (
        <div
            className={cn(styles.emptyContent, {
                [styles.danger]: danger,
            })}
            {...props}
        >
            <div className={cn(styles.emptyImgInner, {
                [styles.small]: small
            })}>{icon ? icon : <Data />}</div>

            {text && <Text variant="text2">{text}</Text>}

            {children}
        </div>
    );
};

export default NotContent;
