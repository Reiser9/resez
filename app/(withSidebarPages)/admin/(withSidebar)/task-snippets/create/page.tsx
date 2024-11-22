'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';

import type { SubjectFilter } from '@/entities/subject';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useSubjects } from '@/features/subjects';
import { getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import useAlert from '@/shared/hooks/useAlert';

import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { EditorCore } from '@/shared/ui/Editor/Editor';
import { Input } from '@/shared/ui/Input';
import { useTaskSnippet } from '@/features/task-snippet';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const AdminTaskSnippetCreate = () => {
    const [subject, setSubject] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState('');

    const [subjects, setSubjects] = React.useState<SubjectFilter[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectFilter[]>([]);

    const snippetRef = React.useRef<EditorCore | null>(null);

    const { getPagginationSubjects } = useSubjects();
    const { createSnippet } = useTaskSnippet();
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

    const handleSearchSubjects = (value: string) => {
        const filteredOptions = subjects.filter((subject) =>
            subject.subject.toLowerCase().includes(value.toLowerCase()),
        );

        setSubjectsFilter(filteredOptions);
    };

    const createTaskSnippetMutation = useMutation({
        mutationFn: async () => {
            const savedData = await snippetRef.current?.save();
            const content = getHtmlInEditor(savedData?.blocks);

            if (!subject) {
                return alertNotify('Предупреждение', 'Предмет не может быть пустым', 'warn');
            }
            if (!content) {
                return alertNotify('Предупреждение', 'Разбор задания не должен быть пустым', 'warn');
            }

            createSnippet(title, subject, content, () => {
                router.push('/admin/task-snippets');
            });
        },
    });

    React.useEffect(() => {
        if (subjectsData) {
            setSubjects(subjectsData.subjects);
            setSubjectsFilter(subjectsData.subjects);
        }
    }, [subjectsData]);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.ANALYSIS_TASKS]}>
            <CreatePageWrapper
                title="Создание вставки"
                button={
                    subject && (
                        <Button
                            auto
                            levitation
                            loading={createTaskSnippetMutation.isPending}
                            onClick={() => createTaskSnippetMutation.mutate()}
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
                        onChange={(value) => setSubject(value)}
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
                            <Input value={title} setValue={setTitle} title="Название" lengthLimit={75} trackLength />

                            <Editor title="Вставка" editorRef={snippetRef} id="snippetEditor" />
                        </>
                    )}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminTaskSnippetCreate;
