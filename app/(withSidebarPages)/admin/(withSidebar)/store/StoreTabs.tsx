'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

type StoreTab = {
    name: string;
    link: string;
};

const storeTabs: StoreTab[] = [
    {
        name: 'Украшения аватарок',
        link: '/admin/store/products/avatar',
    },
    {
        name: 'Баннеры',
        link: '/admin/store/products/banner',
    },
    {
        name: 'Темы',
        link: '/admin/store/products/theme',
    },
];

const StoreTabs = () => {
    const pathname = usePathname();

    return (
        <ScrollWithArrows>
            {storeTabs.map((data, id) => (
                <Link
                    key={id}
                    prefetch={false}
                    href={data.link}
                    className={cn(base.tag, {
                        [base.active]: pathname === data.link,
                    })}
                    replace
                >
                    {data.name}
                </Link>
            ))}
        </ScrollWithArrows>
    );
};

export default StoreTabs;
