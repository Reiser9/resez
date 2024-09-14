'use client';

import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import type { LocalNotify } from '@/entities/notify/model';
import { useAppDispatch } from '@/shared/hooks/useRedux';
import { removeLocalNotify } from '@/store/slices/notify';
import { getNotifyIcon } from '@/shared/utils/getNotifyIcon';

import { Text } from '../Text';

type Props = {
    data: LocalNotify;
};

const Notify: React.FC<Props> = ({ data }) => {
    const { id, title, text, type, to, time } = data;

    const notifyTimeout = React.useRef<number | undefined>(undefined);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const remove = React.useCallback(() => {
        dispatch(removeLocalNotify(id));
    }, [dispatch, id]);

    const removeOnClick = () => {
        if (to) {
            router.push(to);
        }

        remove();
        window.clearTimeout(notifyTimeout.current);
    };

    React.useEffect(() => {
        if (time !== -1) {
            notifyTimeout.current = window.setTimeout(remove, time);
        }

        return () => window.clearTimeout(notifyTimeout.current);
    }, [remove, time]);

    return (
        <div className={cn(styles.notifyItem, styles[type])} onClick={removeOnClick}>
            <div className={styles.notifyItemIconWrapper}>{getNotifyIcon(type)}</div>

            <div className={styles.notifyItemWrapper}>
                <Text variant="h4">{title}</Text>
                <Text variant="text2">{text}</Text>
            </div>
        </div>
    );
};

export default Notify;
