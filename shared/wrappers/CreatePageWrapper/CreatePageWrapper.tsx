import React from 'react';

import base from '@/shared/styles/base.module.scss';

import { BackButton } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

type Props = {
    title: string;
    button?: React.ReactNode;
    rightButton?: React.ReactNode;
    children: React.ReactNode;
};

const CreatePageDefault: React.FC<Props> = ({ title, button, rightButton, children }) => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <BackButton confirmExit />

                    <Text variant="h3">{title}</Text>
                </div>

                {rightButton && rightButton}
            </div>

            {children}

            {button && button}
        </div>
    );
};
export default CreatePageDefault;
