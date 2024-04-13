import React from 'react';
import { Select as SelectAnt } from 'antd';
import cn from 'classnames';

import styles from './index.module.scss';

import { ArrowBottom, Cross } from '@/shared/icons';
import { Preloader } from '../Preloader';
import { NotContent } from '../NotContent';
import { Text } from '../Text';
import { SelectProps } from 'antd/lib';

type Option = {
    label: string;
    value: string;
};

type Props = {
    placeholder?: string;
    value: "Мужской" | "Женский" | null;
    setValue: (value: "Мужской" | "Женский") => void;
    options: Option[];
    loading?: boolean;
    showSearch?: boolean;
    clear?: boolean;
    notContentText?: string;
    title?: string;
    wrapperClass?: string;
    className?: string;
} & SelectProps;

const Select: React.FC<Props> = ({
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
}) => {
    return (
        <div className={cn(styles.selectInner, wrapperClass)}>
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
                    loading ? <Preloader small className={styles.loader} /> : <NotContent text={notContentText} />
                }
                removeIcon={<Cross width="14" />}
                options={options}
                {...props}
            />
        </div>
    );
};

export default Select;
