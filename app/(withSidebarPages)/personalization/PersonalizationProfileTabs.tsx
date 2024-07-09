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
        link: '/personalization/avatar',
    },
    {
        name: 'Баннеры',
        link: '/personalization/banner',
    },
];

const PersonalizationProfileTabs = () => {
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

export default PersonalizationProfileTabs;
