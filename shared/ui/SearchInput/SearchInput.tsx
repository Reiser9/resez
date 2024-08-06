'use client';

import React from 'react';

import styles from './index.module.scss';

import { Input } from '../Input';
import { Search } from '@/shared/icons';

type Props = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
};

const SearchInput: React.FC<Props> = ({ value, setValue, placeholder = 'Искать' }) => {
    return (
        <div className={styles.searchInner}>
            <Input placeholder={placeholder} className={styles.searchInput} value={value} setValue={setValue} />

            <Search className={styles.searchIcon} />
        </div>
    );
};

export default SearchInput;
