'use client';

import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';

import styles from './index.module.scss';

import { getHolidayEvent } from '@/shared/utils/getHolidayEvent';

const event = getHolidayEvent();

const Logo = () => {
    return (
        <Link href="/" className={cn(styles.logoInner, styles[event.class])}>
            <span className={styles.logo}>
                ResEz
                {event?.decor && (
                    <Image width={15} height={15} src={event?.decor} alt="event" className={styles.logoDecor} />
                )}
            </span>

            {event?.icon && <Image width={24} height={24} src={event?.icon} alt="event" className={styles.logoImg} />}

            <span className={styles.logoVersion}>{process.env.NEXT_PUBLIC_APP_VERSION}</span>
        </Link>
    );
};

export default Logo;
