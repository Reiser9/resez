'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

type PersonalizationTab = {
    name: string;
    link: string;
};

const personalizationTabs: PersonalizationTab[] = [
    {
        name: 'Украшения аватарок',
        link: '/personalization/avatar',
    },
    // {
    //     name: 'Баннеры',
    //     link: '/personalization/banner',
    // },
    {
        name: 'Темы',
        link: '/personalization/theme',
    },
];

const PersonalizationProfileTabs = () => {
    const pathname = usePathname();

    return (
        <ScrollWithArrows>
            {personalizationTabs.map((data, id) => (
                <Link
                    key={id}
                    href={data.link}
                    prefetch={false}
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

export default PersonalizationProfileTabs;
