'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

const tabs = [
    {
        name: 'Главная',
        href: '/training/memory',
    },
    {
        name: 'Мои коллекции',
        href: '/training/memory/my',
    },
    {
        name: 'Лайкнутые коллекции',
        href: '/training/memory/liked',
    },
];

const Tabs = () => {
    const path = usePathname();

    return (
        <ScrollWithArrows>
            {tabs.map((data, id) => (
                <Link
                    key={id}
                    prefetch={false}
                    href={data.href}
                    replace
                    className={cn(base.tag, {
                        [base.active]: path === data.href,
                    })}
                >
                    {data.name}
                </Link>
            ))}
        </ScrollWithArrows>
    );
};

export default Tabs;
