'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useParams, usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrow } from '@/shared/ui/ScrollWithArrow';

const AdminUserTabs = () => {
    const { id } = useParams();
    const pathname = usePathname();

    return (
        <ScrollWithArrow>
            <Link
                href={`/admin/users/${id}`}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}`,
                })}
                replace
            >
                Главная
            </Link>

            <Link
                href={`/admin/users/${id}/roles`}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/roles`,
                })}
                replace
            >
                Роли
            </Link>

            <Link
                href={`/admin/users/${id}/sessions`}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/sessions`,
                })}
                replace
            >
                Сессии
            </Link>

            <Link
                href={`/admin/users/${id}/collections`}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/collections`,
                })}
                replace
            >
                Коллекции
            </Link>
        </ScrollWithArrow>
    );
};

export default AdminUserTabs;
