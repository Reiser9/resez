'use client';

import React from 'react';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Plus } from '@/shared/icons';

import { Text } from '@/shared/ui/Text';
import { IconButton } from '@/shared/ui/Button';

const AdminPromo = () => {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.PROMOCODES]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">Промокоды (1)</Text>

                    <Tooltip title="Создать">
                        <IconButton small variant="light" href="/admin/promo/create" circle>
                            <Plus />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        </PrivateWrapper>
    );
};

export default AdminPromo;
