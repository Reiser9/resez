'use client';

import Image from 'next/image';
import cn from 'classnames';
import { HTMLAttributes } from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import useShortInfo from '@/features/user/data/useShortInfo';
import { useAppSelector } from '@/shared/hooks/useRedux';

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
    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
        enabled: isAuth,
    });

    const { settings } = user?.user || {};
    const { isHideAvatars } = settings || {};

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
