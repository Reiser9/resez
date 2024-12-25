import React from 'react';
import { Metadata } from 'next';

import base from '@/shared/styles/base.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import AdminNotifyTabs from './AdminNotifyTabs';

export const metadata: Metadata = {
    title: 'ResEz - Админка - Уведомления',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.NOTIFIES]}>
            <div className={base.baseWrapperGap16}>
                <AdminNotifyTabs />

                { children }
            </div>
        </PrivateWrapper>
    );
}
