import React from 'react';

import base from '@/shared/styles/base.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import ArchiveTabs from './ArchiveTabs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.ARCHIVE]}>
            <div className={base.baseWrapperGap16}>
                <ArchiveTabs />

                {children}
            </div>
        </PrivateWrapper>
    );
}
