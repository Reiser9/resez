"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import type { SubjectFilter } from '@/entities/subject';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import { useSubjects } from '@/features/subjects';
import { useUserPermissions } from '@/features/user';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

import { Modal } from '@/shared/ui/Modal';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';

type Props = {
    filterOpen: boolean;
    setFilterOpen: (value: boolean) => void;
    subjectId: string | null;
};

const SnippetsFilter: React.FC<Props> = ({ filterOpen, setFilterOpen, subjectId }) => {
    const [subject, setSubject] = React.useState<string | null>(null);

    const [subjects, setSubjects] = React.useState<SubjectFilter[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectFilter[]>([]);

    const { getUserPermissions } = useUserPermissions();
    const { getPagginationSubjects } = useSubjects();
    const router = useRouter();

    const handleSearchSubject = (value: string) => {
        const filteredOptions = subjects.filter((subject) =>
            subject.subject.toLowerCase().includes(value.toLowerCase()),
        );

        setSubjectsFilter(filteredOptions);
    };

    const resetFilter = () => {
        setFilterOpen(false);
        setSubject(null);
        router.replace('/admin/task-snippets');
    };

    const applyFilters = () => {
        const newUrl = buildQueryString({
            subject_id: subject,
        });
        router.replace(`?${newUrl}`);
        setFilterOpen(false);
    };

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const { data: subjectsData, isLoading: subjectsIsLoading } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
        enabled: checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
    });

    React.useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData.subjects);
            setSubjectsFilter(subjectsData.subjects);
        }
    }, [subjectsData]);

    React.useEffect(() => {
        if (subjectId) {
            setSubject(subjectId);
        }
    }, [subjectId]);

    return (
        <Modal value={filterOpen} setValue={setFilterOpen} title="Фильтры" size="small">
            <Select
                title="Предмет"
                notContentText="Предметов не найдено"
                loading={subjectsIsLoading}
                value={subject}
                onChange={(value) => {
                    setSubject(value);
                    setSubjectsFilter(subjects);
                }}
                clear
                options={subjectsFilter?.map((data) => ({
                    label: data.subject,
                    value: String(data.id),
                }))}
                showSearch
                onSearch={handleSearchSubject}
                filterOption={false}
            />

            <Button variant="light" color="danger" onClick={resetFilter}>
                Сбросить
            </Button>

            <Button onClick={applyFilters}>Применить</Button>
        </Modal>
    );
};

export default SnippetsFilter;
