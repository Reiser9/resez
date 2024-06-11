<<<<<<< HEAD
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
=======
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
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
