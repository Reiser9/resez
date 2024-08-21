'use client';

import Image from 'next/image';
import cn from 'classnames';
import { HTMLAttributes } from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { useAppSelector } from '@/shared/hooks/useRedux';
import { useSettings } from '@/features/user';

type Props = {
    text?: string;
    image?: string | null;
    dot?: boolean;
    icon?: React.ReactNode;
    size?: 'small' | 'normal' | 'big';
    isUserAvatar?: boolean;
    indicator?: string | number;
} & HTMLAttributes<HTMLDivElement>;

const Badge: React.FC<Props> = ({
    text,
    image,
    icon,
    dot = false,
    isUserAvatar = false,
    size = 'normal',
    indicator,
    className,
    ...props
}) => {
    const isAuth = useAppSelector((state) => state.user.isAuth);
    const { getSettings } = useSettings();

    const { data, isLoading } = useQuery({
        queryKey: ['user_settings'],
        queryFn: () => getSettings(),
        enabled: isAuth,
    });

    const { isHideAvatars } = data || {};

    return (
        <div
            className={cn(styles.badge, styles[size], className, {
                [styles.dot]: dot,
            })}
            {...props}
        >
            {(image && !isHideAvatars) || (image && !isUserAvatar) ? (
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
