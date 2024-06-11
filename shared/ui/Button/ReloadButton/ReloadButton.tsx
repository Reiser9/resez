<<<<<<< HEAD
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
=======
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
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
