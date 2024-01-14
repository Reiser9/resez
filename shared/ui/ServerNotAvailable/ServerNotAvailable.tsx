import React from 'react';

import { Button } from '@/shared/ui/Button';
import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { Server } from '@/shared/icons/picture/Server';

const ServerNotAvailable = () => {
    return (
        <FullPageWrapper
            icon={<Server />}
            code="<span>5</span>00"
            text="Сервер временно недоступен, вернитесь на сайт позже."
        >
            <Button auto variant="outline" style={{marginTop: 24, minWidth: 160}}>
                Перезагрузить
            </Button>
        </FullPageWrapper>
    );
};

export default ServerNotAvailable;
