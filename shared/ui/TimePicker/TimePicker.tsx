'use client';

import React from 'react';
import { TimePicker as TimePickerAnt, TimePickerProps } from 'antd';
import { Dayjs } from 'dayjs';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Clock } from '@/shared/icons';

import { Text } from '../Text';

type Props = {
    placeholder?: string;
    title?: string;
    format?: string;
    value?: Dayjs;
    setValue: (value?: Dayjs) => void;
    wrapperClass?: string;
} & TimePickerProps;

const TimePicker: React.FC<Props> = ({
    placeholder,
    format = 'HH:mm',
    title,
    value,
    setValue,
    wrapperClass,
    ...props
}) => {
    return (
        <div className={cn(base.baseWrapperGap4, wrapperClass)}>
            {title && <Text variant="text3">{title}</Text>}

            <TimePickerAnt
                placeholder={placeholder}
                format={format}
                style={{ width: '100%' }}
                value={value}
                onChange={(e) => setValue(e ?? undefined)}
                suffixIcon={<Clock style={{ width: 18, color: 'var(--text)' }} />}
                {...props}
            />
        </div>
    );
};

export default TimePicker;
