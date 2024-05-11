'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrow } from '@/shared/ui/ScrollWithArrow';

type ArchiveTab = {
    name: string;
    link: string;
};

const archiveTabs: ArchiveTab[] = [
    {
        name: 'Предметы',
        link: '/admin/archive/subjects',
    },
    {
        name: 'Роли',
        link: '/admin/archive/roles',
    },
];

const ArchiveTabs = () => {
    const pathname = usePathname();

    return (
        <ScrollWithArrow>
            {archiveTabs.map((data, id) => (
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

export default ArchiveTabs;
