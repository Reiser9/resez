'use client';

import React from 'react';
import { Tooltip } from 'antd';

import { IconButton } from '..';
import { Reload } from '@/shared/icons/Reload';
import { IconButtonProps } from '../IconButton/IconButton';

const ReloadButton: React.FC<IconButtonProps> = (props) => {
    return (
        <Tooltip title="Обновить">
            <IconButton small circle variant="light" {...props}>
                <Reload />
            </IconButton>
        </Tooltip>
    );
};

export default ReloadButton;
