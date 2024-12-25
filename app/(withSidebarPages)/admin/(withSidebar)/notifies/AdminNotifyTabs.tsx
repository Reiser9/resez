'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

const AdminNotifyTabs = () => {
    const path = usePathname();

    return (
        <ScrollWithArrows>
            <Link
                prefetch={false}
                href="/admin/notifies"
                replace
                className={cn(base.tag, {
                    [base.active]: path === '/admin/notifies',
                })}
            >
                Отправить
            </Link>

            <Link
                prefetch={false}
                href="/admin/notifies/delayed"
                replace
                className={cn(base.tag, {
                    [base.active]: path === '/admin/notifies/delayed',
                })}
            >
                Отложенные
            </Link>

            <Link
                prefetch={false}
                href="/admin/notifies/log"
                replace
                className={cn(base.tag, {
                    [base.active]: path === '/admin/notifies/log',
                })}
            >
                История
            </Link>
        </ScrollWithArrows>
    );
};

export default AdminNotifyTabs;
