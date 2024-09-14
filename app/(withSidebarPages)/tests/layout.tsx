import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';

export const metadata: Metadata = {
    title: 'ResEz - Тесты',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.content}>
                    <div className={base.baseWrapperGap16}>
                        {children}
                    </div>
                </div>

                <InnerPageSidebar>
                    <SidebarLink href="/tests/subject">
                        Главная
                    </SidebarLink>
                    <SidebarLink href="/tests/history">История решений</SidebarLink>
                </InnerPageSidebar>
            </div>
        </ContentWrapper>
    );
}
