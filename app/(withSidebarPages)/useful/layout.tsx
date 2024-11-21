import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';

export const metadata: Metadata = {
    title: 'ResEz - Полезное',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.content}>{children}</div>

                <InnerPageSidebar>
                    <SidebarLink href="/useful" end>
                        Главная
                    </SidebarLink>
                    <SidebarLink href="/useful/points">Баллы ЕГЭ</SidebarLink>
                    <SidebarLink href="/useful/task-analysis">Разбор заданий</SidebarLink>
                </InnerPageSidebar>
            </div>
        </ContentWrapper>
    );
}
