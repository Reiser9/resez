'use client';

import React from 'react';
import { Tooltip } from 'antd';

import type { IconButtonProps } from '../IconButton/IconButton';
import { Reload } from '@/shared/icons/Reload';

import { IconButton } from '..';

const ReloadButton: React.FC<IconButtonProps> = (props) => {
    return (
        <Tooltip destroyTooltipOnHide title="Обновить">
            <IconButton small circle variant="light" {...props}>
                <Reload />
            </IconButton>
        </Tooltip>
    );
};

export default ReloadButton;
