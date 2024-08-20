'use client';

import React from 'react';

import styles from './index.module.scss';

import { Text } from '../../Text';

type Props = {
    name?: string;
    textColor: string;
    backgroundColor: string;
};

const RolePreview: React.FC<Props> = ({ name, textColor, backgroundColor }) => {
    return (
        <div className={styles.rolePreview}>
            <Text variant="text2">Предпросмотр:</Text>

            <div
                className={styles.rolePreviewItem}
                style={{
                    color: textColor,
                    background: backgroundColor,
                }}
            >
                {name ? name : 'Название роли'}
            </div>
        </div>
    );
};

export default RolePreview;
