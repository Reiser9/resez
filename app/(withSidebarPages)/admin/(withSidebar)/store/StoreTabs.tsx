'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrow } from '@/shared/ui/ScrollWithArrow';

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
        <ScrollWithArrow>
            {storeTabs.map((data, id) => (
                <Link
                    key={id}
                    href={data.link}
                    className={cn(base.tag, {
                        [base.active]: pathname === data.link,
                    })}
                    replace
                >
                    {data.name}
                </Link>
            ))}
        </ScrollWithArrow>
    );
};

export default StoreTabs;
