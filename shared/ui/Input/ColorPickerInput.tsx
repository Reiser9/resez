'use client';

import React from 'react';
import { ColorPicker, ColorPickerProps } from 'antd';

import styles from './index.module.scss';

import { Input } from '.';

type Props = {
    title: string;
    hexString: string;
} & ColorPickerProps;

const ColorPickerInput: React.FC<Props> = ({ title, hexString, ...props }) => {
    return (
        <ColorPicker {...props}>
            <Input readOnly value={hexString} title={title}>
                <div className={styles.colorView} style={{ background: hexString }}></div>
            </Input>
        </ColorPicker>
    );
};

export default ColorPickerInput;
