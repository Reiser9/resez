'use client';

import React from 'react';
import { Checkbox } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Button } from '@/shared/ui/Button';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { Select } from '@/shared/ui/Select';
import { useSubjects } from '@/features/subjects';
import { SubjectFilter } from '@/entities/subject';
import { useTest } from '@/features/test';
import GenerateTestItem from './GenerateTestItem';
import { Preloader } from '@/shared/ui/Preloader';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';

const AdminTestCreate = () => {
    const [subject, setSubject] = React.useState<string | null>(null);
    const [generateVariant, setGenerateVariant] = React.useState(false);
    const [isOfficial, setIsOfficial] = React.useState(false);

    const [subjects, setSubjects] = React.useState<SubjectFilter[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectFilter[]>([]);
    const [subjectsDroped, setSubjectsDroped] = React.useState(false);

    const { getPagginationSubjects, getTasksBySubjectId } = useSubjects();
    const { createTest } = useTest();
    const router = useRouter();

    const {
        data: subjectsData,
        isLoading: subjectsIsLoading,
        isError: subjectsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
        enabled: subjectsDroped,
    });

    const {
        data: tasksData,
        isLoading: tasksIsLoading,
        isError: tasksError,
        refetch,
    } = useQuery({
        queryKey: ['subject_tasks_by_id', subject],
        queryFn: () => getTasksBySubjectId(String(subject)),
        enabled: !!subject,
    });

    const createTestHandler = async () => {
        if (!subject) {
            return;
        }

        if (generateVariant) {
            createTest(String(subject), false, isOfficial, () => {
                router.replace('/admin/tests');
            });
        }
    };

    const subjectDropdown = (open: boolean) => {
        if (open && subjects.length === 0) {
            setSubjectsDroped(true);
        }
    };

    const handleSearchSubjects = (value: string) => {
        const filteredOptions = subjects.filter((subject) =>
            subject.subject.toLowerCase().includes(value.toLowerCase()),
        );

        setSubjectsFilter(filteredOptions);
    };

    React.useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData.subjects);
            setSubjectsFilter(subjectsData.subjects);
        }
    }, [subjectsData]);

    React.useEffect(() => {
        if (subject) {
            refetch();
        }
    }, [subject]);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.CREATE_OFFICIAL_TESTS]}>
            <CreatePageWrapper
                title="Создание теста"
                button={
                    subject && (
                        <Button auto levitation onClick={createTestHandler}>
                            Создать
                        </Button>
                    )
                }
            >
                <div className={base.formMedium}>
                    <Select
                        title="Предмет"
                        notContentText="Предметов не найдено"
                        loading={subjectsIsLoading}
                        onDropdownVisibleChange={subjectDropdown}
                        value={subject}
                        onChange={(value) => {
                            setSubject(value);
                            setSubjectsFilter(subjects);
                        }}
                        options={subjectsFilter?.map((data) => ({
                            label: data.subject,
                            value: String(data.id),
                        }))}
                        showSearch
                        onSearch={handleSearchSubjects}
                        filterOption={false}
                    />

                    {subject && (
                        <>
                            <Checkbox checked={generateVariant} onChange={(e) => setGenerateVariant(e.target.checked)}>
                                Сгенерировать вариант ЕГЭ
                            </Checkbox>

                            <Checkbox checked={isOfficial} onChange={(e) => setIsOfficial(e.target.checked)}>
                                Вариант от ResEz Team
                            </Checkbox>

                            {!generateVariant &&
                                (tasksIsLoading ? (
                                    <Preloader page small />
                                ) : (
                                    <div className={styles.generateForm}>
                                        {tasksData?.map((data) => (
                                            <GenerateTestItem
                                                key={data.id}
                                                data={data}
                                                // setSubThemes={setSubThemesHandler}
                                                // setCountTasks={setCountTasksHandler}
                                            />
                                        ))}
                                    </div>
                                ))}
                        </>
                    )}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminTestCreate;
