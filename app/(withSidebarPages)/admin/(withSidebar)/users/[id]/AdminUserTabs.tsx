'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useParams, usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

const AdminUserTabs = () => {
    const { id } = useParams();
    const pathname = usePathname();

    return (
        <ScrollWithArrows>
            <Link
                href={`/admin/users/${id}`}
                prefetch={false}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}`,
                })}
                replace
            >
                Главная
            </Link>

            <Link
                href={`/admin/users/${id}/roles`}
                prefetch={false}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/roles`,
                })}
                replace
            >
                Роли
            </Link>

            <Link
                href={`/admin/users/${id}/sessions`}
                prefetch={false}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/sessions`,
                })}
                replace
            >
                Сессии
            </Link>

            <Link
                href={`/admin/users/${id}/collections`}
                prefetch={false}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/collections`,
                })}
                replace
            >
                Коллекции
            </Link>

            <Link
                href={`/admin/users/${id}/activity`}
                prefetch={false}
                className={cn(base.tag, {
                    [base.active]: pathname === `/admin/users/${id}/activity`,
                })}
                replace
            >
                Активность
            </Link>
        </ScrollWithArrows>
    );
};

export default AdminUserTabs;
