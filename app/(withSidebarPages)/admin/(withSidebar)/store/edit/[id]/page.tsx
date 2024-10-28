'use client';

import React from 'react';

import base from '@/shared/styles/base.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';

import { Button } from '@/shared/ui/Button';

const AdminStoreEdit = () => {
    const editProductHandler = () => {};

    return (
        <PrivateWrapper permissions={[PERMISSIONS.UPDATE_PRODUCTS]}>
            <CreatePageWrapper
                title="Редактирование товара"
                button={
                    <Button auto levitation onClick={editProductHandler}>
                        Сохранить
                    </Button>
                }
            >
                <div className={base.formMedium}></div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminStoreEdit;
