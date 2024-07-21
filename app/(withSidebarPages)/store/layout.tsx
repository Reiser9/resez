import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';

export const metadata: Metadata = {
    title: 'ResEz - Магазин',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ContentWrapper>
            <div className={pws.wrapper}>
                <div className={pws.content}>{children}</div>

                <InnerPageSidebar>
                    <SidebarLink href="/store" end>
                        Главная
                    </SidebarLink>
                    <SidebarLink href="/store/personalization">Персонализация</SidebarLink>
                    <SidebarLink href="/store/subscription">Подписка</SidebarLink>
                    <SidebarLink href="/store/coins">Валюта</SidebarLink>
                </InnerPageSidebar>
            </div>
        </ContentWrapper>
    );
}
