import React from 'react';

import { IconButton } from '..';
import { Reload } from '@/shared/icons/Reload';
import { IconButtonProps } from '../IconButton/IconButton';

const ReloadButton: React.FC<IconButtonProps> = (props) => {
    return (
        <IconButton small circle {...props}>
            <Reload />
        </IconButton>
    );
};

export default ReloadButton;
