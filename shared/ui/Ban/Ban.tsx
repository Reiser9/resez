import React from 'react';

import { Button } from '@/shared/ui/Button';
import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { Blocked } from '@/shared/icons';

const Ban = () => {
    return (
        <FullPageWrapper
            icon={<Blocked />}
            code="4<span>0</span>3"
            text="Ваша учетная запись заблокирована."
        >
            <Button auto variant="outline" style={{marginTop: 24, minWidth: 160}}>
                Выйти
            </Button>
        </FullPageWrapper>
    );
};

export default Ban;
