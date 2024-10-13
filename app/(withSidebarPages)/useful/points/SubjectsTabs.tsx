'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';
import { useSubjects } from '@/features/subjects';
import { ScrollSkeleton } from '@/shared/ui/Skeleton';

const SubjectsTabs = ({ baseUrl = '/useful/points/', exact = true }) => {
    const { getSubjects } = useSubjects();
    const pathname = usePathname();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjects,
    });

    const { subjects } = data || {};

    if (isLoading) {
        return <ScrollSkeleton />;
    }

    return (
        <>
            {!isError && !!subjects?.length && (
                <ScrollWithArrows>
                    {subjects?.map((data) => (
                        <Link
                            key={data.id}
                            prefetch={false}
                            href={`${baseUrl}${data.slug}`}
                            replace
                            className={cn(base.tag, {
                                [base.active]: exact
                                    ? pathname === `${baseUrl}${data.slug}`
                                    : pathname.includes(`${baseUrl}${data.slug}`),
                            })}
                        >
                            {data.subject}
                        </Link>
                    ))}
                </ScrollWithArrows>
            )}
        </>
    );
};

export default SubjectsTabs;
