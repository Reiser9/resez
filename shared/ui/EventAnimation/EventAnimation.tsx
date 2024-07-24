'use client';

import React from 'react';
import Snowfall from 'react-snowfall';
import cn from 'classnames';

import styles from './index.module.scss';

import { getHolidayEvent } from '../../utils/getHolidayEvent';
import { useEventContext } from '@/shared/context/EventProvider';

const EventAnimation = () => {
    const holidayEventName = getHolidayEvent().name;
    const { showParticles } = useEventContext();
    // TODO: как то сделать с фото снежинки или поменять библиотеку

    return (
        <>
            {holidayEventName === 'newyear' && (
                <div
                    className={cn(styles.snow, {
                        [styles.hide]: !showParticles,
                    })}
                >
                    <Snowfall snowflakeCount={40} wind={[0, 3]} radius={[2, 4]} />
                </div>
            )}
        </>
    );
};

export default EventAnimation;
