"use client";

import React from 'react';
import { Tooltip } from 'antd';

import base from '@/shared/styles/base.module.scss';

import { IconButton, ReloadButton } from '@/shared/ui/Button';
import { Plus } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';

const AdminStoreAvatar = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <div className={base.titleWrapper}>
                    <Text variant="h3">Баннеры (1)</Text>

                    <ReloadButton />
                </div>

                <Tooltip destroyTooltipOnHide title="Создать">
                    <IconButton href="/admin/store/create" variant="light" small circle>
                        <Plus />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default AdminStoreAvatar;
