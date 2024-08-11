'use client';

import React from 'react';

import { InnerPageSidebar } from '@/shared/ui/InnerPageSidebar';
import { SidebarLink } from '@/shared/ui/SidebarLink';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useAppSelector } from '@/shared/hooks/useRedux';

const AdminSidebar = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    return (
        <InnerPageSidebar>
            <SidebarLink href="/admin" end>
                Главная
            </SidebarLink>
            {checkPermission(permissions, [PERMISSIONS.NOTIFIES]) && (
                <SidebarLink href="/admin/notifies">Уведомления</SidebarLink>
            )}
            {checkPermission(permissions, [PERMISSIONS.USERS]) && (
                <SidebarLink href="/admin/users">Пользователи</SidebarLink>
            )}
            {checkPermission(permissions, [PERMISSIONS.ROLES]) && <SidebarLink href="/admin/roles">Роли</SidebarLink>}
            {checkPermission(permissions, [PERMISSIONS.COMPLAINTS]) && (
                <SidebarLink href="/admin/warns">Жалобы</SidebarLink>
            )}
            {checkPermission(permissions, [PERMISSIONS.ARCHIVE]) && (
                <SidebarLink href="/admin/archive">Архив</SidebarLink>
            )}
            {checkPermission(permissions, [PERMISSIONS.SUBJECTS]) && (
                <SidebarLink href="/admin/subjects">Предметы</SidebarLink>
            )}
            {checkPermission(permissions, [PERMISSIONS.TASKS]) && (
                <SidebarLink href="/admin/tasks">Задания</SidebarLink>
            )}
            {checkPermission(permissions, [PERMISSIONS.TESTS]) && <SidebarLink href="/admin/tests">Тесты</SidebarLink>}
            {checkPermission(permissions, [PERMISSIONS.STORE]) && (
                <SidebarLink href="/admin/store/products">Магазин</SidebarLink>
            )}
        </InnerPageSidebar>
    );
};

export default AdminSidebar;
