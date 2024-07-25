'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useSubjects } from '@/features/subjects';
import { NotContent } from '@/shared/ui/NotContent';
import { Cross } from '@/shared/icons';

const UsefulPoints = () => {
    const { getSubjects } = useSubjects();

    const { data, error } = useQuery({
        queryKey: ['subjects'],
        queryFn: getSubjects,
    });

    const { subjects } = data || {};

    const router = useRouter();

    React.useEffect(() => {
        if (!!subjects?.length) {
            router.push(`/useful/points/${subjects[0].slug}`);
        }
    }, [subjects]);

    return (
        <>
            {!subjects?.length && (
                <NotContent
                    danger
                    icon={<Cross />}
                    text={error ? 'Произошла ошибка при загрузке данных' : 'Таблицы баллов еще не созданы'}
                />
            )}
        </>
    );
};

export default UsefulPoints;
