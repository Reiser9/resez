'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';
import { useSubjects } from '@/features/subjects';

const TestsPage = () => {
    const { getSubjects } = useSubjects();

    const { data, error } = useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjects,
    });

    const { subjects } = data || {};

    const router = useRouter();

    React.useEffect(() => {
        if (!!subjects?.length) {
            router.push(`/tests/subject/${subjects[0].slug}`);
        }
    }, [subjects]);

    return (
        <>
            {!subjects?.length && (
                <NotContent
                    danger
                    icon={<Cross />}
                    text={error ? 'Произошла ошибка при загрузке данных' : 'Предметы еще не созданы'}
                />
            )}
        </>
    );
};

export default TestsPage;
