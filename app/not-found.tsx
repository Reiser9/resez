import React from 'react';

import { Button } from '@/shared/ui/Button';
import { FullPageWrapper } from '@/shared/wrappers/FullPageWrapper';
import { NotFoundIcon } from '@/shared/icons';

const NotFound = () => {
    return (
        <FullPageWrapper
            icon={<NotFoundIcon />}
            code="4<span>0</span>4"
            text="К сожалению, запрашиваемая страница не найдена. Возможно, вы ошиблись при вводе адреса или страница была удалена."
        >
            <Button auto variant="outline" href="/" style={{marginTop: 24, minWidth: 160}}>
                На главную
            </Button>
        </FullPageWrapper>
    );
};

export default NotFound;
