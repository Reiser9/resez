import React from 'react';

import base from '@/shared/styles/base.module.scss';

import ArchiveTabs from './ArchiveTabs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <ArchiveTabs />

            { children }
        </div>
    );
}
