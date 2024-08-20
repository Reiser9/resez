'use client';

import React from 'react';
import cn from 'classnames';
import { Select as SelectAnt } from 'antd';
import { SelectProps } from 'antd/lib';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowBottom, Cross } from '@/shared/icons';

import { Preloader } from '../Preloader';
import { NotContent } from '../NotContent';
import { Text } from '../Text';

type Option<T> = {
    label: string;
    value: T;
};

type Props<T> = {
    placeholder?: string;
    value?: T | null;
    setValue?: (value: T) => void;
    options?: Option<T>[];
    loading?: boolean;
    showSearch?: boolean;
    clear?: boolean;
    notContentText?: string;
    title?: string;
    wrapperClass?: string;
    className?: string;
} & SelectProps<T>;

const Select = <T,>({
    placeholder,
    value,
    setValue,
    options,
    notContentText = 'Ничего не найдено',
    title,
    loading = false,
    clear = false,
    wrapperClass,
    className,
    ...props
}: Props<T>) => {
    return (
        <div className={cn(base.baseWrapperGap4, wrapperClass)}>
            {title && <Text variant="text3">{title}</Text>}

            <SelectAnt
                placeholder={placeholder}
                value={value}
                onChange={setValue}
                allowClear={
                    clear
                        ? {
                              clearIcon: <Cross width="16" />,
                          }
                        : false
                }
                className={cn(styles.select, className)}
                suffixIcon={<ArrowBottom width="16" />}
                notFoundContent={
                    loading ? (
                        <Preloader small wrapperClassName={styles.loader} />
                    ) : (
                        <NotContent text={notContentText} />
                    )
                }
                removeIcon={<Cross width="14" />}
                options={options}
                {...props}
            />
        </div>
    );
};

export default Select;
