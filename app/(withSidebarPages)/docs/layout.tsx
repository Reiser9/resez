import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';

export const metadata: Metadata = {
    title: 'ResEz - Документы',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper type='full'>
            <div className={pws.wrapper}>
                <div className={pws.content}>{children}</div>

                <InnerPageSidebar>
                    <SidebarLink href="/docs/rules">
                        Правила проекта
                    </SidebarLink>
                    <SidebarLink href="/docs/publicoffer">Публичная оферта</SidebarLink>
                </InnerPageSidebar>
            </div>
        </ContentWrapper>
    );
}
