import React from 'react';
import { Color } from 'antd/es/color-picker';

import styles from './index.module.scss';

import { ColorPickerInput } from '@/shared/ui/Input';

type Props = {
    textHexString: string;
    backgroundHexString: string;
    textColor: string | Color;
    backgroundColor: string | Color;
    setTextColor: (value: string | Color) => void;
    setBackgroundColor: (value: string | Color) => void;
};

const ThemeCreate: React.FC<Props> = ({
    textHexString,
    backgroundHexString,
    textColor,
    backgroundColor,
    setTextColor,
    setBackgroundColor,
}) => {
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    return (
        <>
            <ColorPickerInput
                title="Основной цвет"
                hexString={textHexString}
                value={textColor}
                format={textColorFormatHex}
                onFormatChange={setTextColorFormatHex}
                onChangeComplete={(color) => setTextColor(color)}
            />

            <ColorPickerInput
                title="Фоновый цвет"
                hexString={backgroundHexString}
                value={backgroundColor}
                format={backgroundColorFormatHex}
                onFormatChange={setBackgroundColorFormatHex}
                onChangeComplete={(color) => setBackgroundColor(color)}
            />

            <div className={styles.themePreviewBlock}></div>
        </>
    );
};

export default ThemeCreate;
