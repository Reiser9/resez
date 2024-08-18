import React from 'react';

import base from '@/shared/styles/base.module.scss';

import StoreTabs from '../StoreTabs';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.STORE]}>
            <div className={base.baseWrapperGap16}>
                <StoreTabs />

                {children}
            </div>
        </PrivateWrapper>
    );
}
