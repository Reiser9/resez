'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import type { SubjectFilter, SubjectTheme } from '@/entities/subject';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useSubjects } from '@/features/subjects';
import { useTaskAnalysis } from '@/features/task-analysis';
import { getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import useAlert from '@/shared/hooks/useAlert';

import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { EditorCore } from '@/shared/ui/Editor/Editor';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const CreateTaskAnalisys = () => {
    const [subject, setSubject] = React.useState<string | null>(null);
    const [theme, setTheme] = React.useState<string | null>(null);

    const [subjects, setSubjects] = React.useState<SubjectFilter[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectFilter[]>([]);
    const [themes, setThemes] = React.useState<SubjectTheme[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTheme[]>([]);

    const analysisRef = React.useRef<EditorCore | null>(null);

    const { getPagginationSubjects, getSubjectThemes } = useSubjects();
    const { createTaskAnalysis } = useTaskAnalysis();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const {
        data: subjectsData,
        isLoading: subjectsIsLoading,
        isError: subjectsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
    });

    const {
        data: themesData,
        isLoading: themesIsLoading,
        isError: themesError,
    } = useQuery({
        queryKey: ['themes', subject],
        queryFn: () => getSubjectThemes(String(subject)),
        enabled: !!subject,
    });

    const handleSearchSubjects = (value: string) => {
        const filteredOptions = subjects.filter((subject) =>
            subject.subject.toLowerCase().includes(value.toLowerCase()),
        );

        setSubjectsFilter(filteredOptions);
    };

    const handleSearchThemes = (value: string) => {
        const filteredOptions = themes.filter((theme) => {
            const themeTemp = `${theme.number}. ${theme.theme}`;
            return themeTemp.toLowerCase().includes(value.toLowerCase());
        });

        setThemesFilter(filteredOptions);
    };

    const createTaskAnalysisMutation = useMutation({
        mutationFn: async () => {
            const savedData = await analysisRef.current?.save();
            const content = getHtmlInEditor(savedData?.blocks);

            if (!theme) {
                return alertNotify('Предупреждение', 'Задание должно быть выбрано', 'warn');
            }
            if (!content) {
                return alertNotify('Предупреждение', 'Разбор задания не должен быть пустым', 'warn');
            }

            createTaskAnalysis(theme, content, () => {
                router.push('/admin/task-analysis');
            });
        },
    });

    React.useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData.subjects);
            setSubjectsFilter(subjectsData.subjects);
        }
    }, [subjectsData]);

    React.useEffect(() => {
        if (themesData) {
            setThemes(themesData);
            setThemesFilter(themesData);
        }
    }, [themesData]);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.ANALYSIS_TASKS]}>
            <CreatePageWrapper
                title="Создание разбора задания"
                button={
                    theme && (
                        <Button
                            auto
                            levitation
                            loading={createTaskAnalysisMutation.isPending}
                            onClick={() => createTaskAnalysisMutation.mutate()}
                        >
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
                        error={subjectsError}
                        value={subject}
                        onChange={(value) => {
                            setTheme(null);
                            setThemes([]);
                            setSubject(value);
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
                        <Select
                            title="Номер задания"
                            notContentText="Заданий не найдено"
                            loading={themesIsLoading}
                            error={themesError}
                            value={theme}
                            onChange={(value) => {
                                setTheme(value);
                            }}
                            options={themesFilter?.map((data) => ({
                                label: `${data.number}. ${data.theme}`,
                                value: String(data.id),
                            }))}
                            showSearch
                            onSearch={handleSearchThemes}
                            filterOption={false}
                        />
                    )}

                    {theme && <Editor title="Разбор задания" editorRef={analysisRef} id="analysisEditor" />}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default CreateTaskAnalisys;
