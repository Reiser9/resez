import { HTMLAttributes } from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    text?: string;
    image?: string | null;
    dot?: boolean;
    icon?: React.ReactNode;
    size?: 'small' | 'normal' | 'big';
    indicator?: string | number;
} & HTMLAttributes<HTMLDivElement>;

const Badge: React.FC<Props> = ({ text, image, icon, dot = false, size = 'normal', indicator, className, ...props }) => {
    return (
        <div
            className={cn(styles.badge, styles[size], className, {
                [styles.dot]: dot,
            })}
            {...props}
        >
            {image ? (
                <Image src={image} alt="Аватар" className={styles.badgeImg} fill />
            ) : (
                text && <p className={styles.badgeText}>{text ? text[0] : 'No'}</p>
            )}

            {icon && icon}

            {!!indicator && <div className={styles.badgeIndicator}>{indicator}</div>}
        </div>
    );
};

export default Badge;
