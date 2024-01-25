'use client';

import React, { ChangeEvent } from 'react';

import styles from './index.module.scss';

type Props = {
    id: string;
    accept?: string;
    setFile: (value: File) => void;
};

const File: React.FC<Props> = ({ id, accept, setFile }) => {
    const [imgPreview, setImgPreview] = React.useState<string | ArrayBuffer | null>(null);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        setFile(e.target.files[0]);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setImgPreview(fileReader.result);
            e.target.value = '';
        };
    };

    return (
        <input
            id={id}
            type="file"
            className={styles.file}
            accept={accept || 'image/png, image/jpeg, image/svg+xml'}
            onChange={onInputChange}
        />
    );
};

export default File;
