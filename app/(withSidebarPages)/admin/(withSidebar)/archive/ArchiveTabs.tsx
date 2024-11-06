'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';

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
    {
        name: 'Задания',
        link: '/admin/archive/tasks',
    },
];

const ArchiveTabs = () => {
    const pathname = usePathname();

    return (
        <ScrollWithArrows>
            {archiveTabs.map((data, id) => (
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

export default ArchiveTabs;
