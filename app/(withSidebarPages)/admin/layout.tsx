import React from 'react';
import { Metadata } from 'next';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

export const metadata: Metadata = {
    title: 'ResEz - Админка',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <PrivateWrapper permissions={[PERMISSIONS.ADMIN]}>
            <ContentWrapper>
                <div className={pws.wrapper}>
                    <div className={pws.content}>{children}</div>

                    <InnerPageSidebar>
                        <SidebarLink href="/admin" end>
                            Главная
                        </SidebarLink>
                        <SidebarLink href="/admin/notifies">Уведомления</SidebarLink>
                        <SidebarLink href="/admin/users">Пользователи</SidebarLink>
                        <SidebarLink href="/admin/roles">Роли</SidebarLink>
                        <SidebarLink href="/admin/warns">Жалобы</SidebarLink>
                    </InnerPageSidebar>
                </div>
            </ContentWrapper>
        </PrivateWrapper>
    );
}
