import React from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker as DatePickerAnt } from 'antd';
import moment from 'moment-timezone';
import cn from 'classnames';

import styles from './index.module.scss';

import { Date } from '@/shared/icons';
import { Text } from '../Text';

type Props = {
    format?: string;
    placeholder?: string;
    title?: string;
    disablePrevDate?: boolean;
    children?: React.ReactNode;
    wrapperClass?: string;
    className?: string;
    value: Dayjs | null;
    setValue: (value: Dayjs | null) => void;
};

const DatePicker: React.FC<Props> = ({
    format = 'DD.MM.YYYY',
    placeholder,
    title,
    value,
    setValue,
    disablePrevDate = false,
    children,
    wrapperClass,
    className,
    ...props
}) => {
    const disabledDate = (current: Dayjs): boolean => {
        return current < moment().startOf('day');
    };

    return (
        <div className={cn(styles.datePickerInner, wrapperClass)}>
            {title && <Text variant="text3">{title}</Text>}

            <DatePickerAnt
                format={format}
                placeholder={placeholder}
                disabledDate={disablePrevDate ? disabledDate : undefined}
                suffixIcon={<Date width="18" />}
                allowClear={false}
                className={cn(styles.datePicker, className)}
                value={value}
                onChange={setValue}
                {...props}
            />
        </div>
    );
};

export default DatePicker;
