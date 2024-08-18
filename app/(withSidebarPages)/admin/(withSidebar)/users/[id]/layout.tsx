import React from 'react';

import base from '@/shared/styles/base.module.scss';

import AdminUserTabs from './AdminUserTabs';
import AdminUserProfile from './AdminUserProfile';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <AdminUserProfile />

            <AdminUserTabs />

            {children}
        </div>
    );
}
