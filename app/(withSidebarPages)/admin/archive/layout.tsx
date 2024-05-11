import React from 'react';
import { Metadata } from 'next';

import base from '@/shared/styles/base.module.scss';

import ArchiveTabs from './ArchiveTabs';

export const metadata: Metadata = {
    title: 'ResEz - Админка | Архив',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={base.baseWrapperGap16}>
            <ArchiveTabs />

            { children }
        </div>
    );
}
