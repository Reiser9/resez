'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrow } from '@/shared/ui/ScrollWithArrow';

type PersonalizationTab = {
    name: string;
    link: string;
};

const personalizationTabs: PersonalizationTab[] = [
    {
        name: 'Украшения аватарок',
        link: '/store/personalization/avatar',
    },
    // {
    //     name: 'Баннеры',
    //     link: '/store/personalization/banner',
    // },
    {
        name: 'Темы',
        link: '/store/personalization/theme',
    },
];

const PersonalizationTabs = () => {
    const pathname = usePathname();

    return (
        <ScrollWithArrow>
            {personalizationTabs.map((data, id) => (
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

export default PersonalizationTabs;
