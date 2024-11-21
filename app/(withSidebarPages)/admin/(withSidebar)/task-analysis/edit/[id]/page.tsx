'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useMutation, useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { useTaskAnalysis } from '@/features/task-analysis';
import { convertHtmlToEditorBlocks, getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import { Cross } from '@/shared/icons';
import useAlert from '@/shared/hooks/useAlert';

import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Button } from '@/shared/ui/Button';
import { EditorCore } from '@/shared/ui/Editor/Editor';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { FakeInput } from '@/shared/ui/Input';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const AdminEditTaskAnalysis = () => {
    const { id } = useParams();

    const [subjectId, setSubjectId] = React.useState<number | null>(null);
    const [subject, setSubject] = React.useState<string>('');
    const [themeId, setThemeId] = React.useState<number | null>(null);
    const [theme, setTheme] = React.useState<string>('');
    const [analysisEditorIsReady, setAnalysisEditorIsReady] = React.useState(false);

    const analysisRef = React.useRef<EditorCore | null>(null);

    const { getTaskAnalysisById, editTaskAnalysis } = useTaskAnalysis();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const {
        data: taskAnalysis,
        isLoading: taskAnalysisIsLoading,
        isError: taskAnalysisError,
    } = useQuery({
        queryKey: ['task_analysis_by_id', id],
        queryFn: () => getTaskAnalysisById(String(id)),
        enabled: !!id,
    });

    const editTaskAnalysisMutation = useMutation({
        mutationFn: async () => {
            const savedData = await analysisRef.current?.save();
            const content = getHtmlInEditor(savedData?.blocks);

            if (!themeId) {
                return alertNotify('Предупреждение', 'Задание должно быть выбрано', 'warn');
            }
            if (!content) {
                return alertNotify('Предупреждение', 'Разбор задания не должен быть пустым', 'warn');
            }

            // editTaskAnalysis(theme, content, () => {
            //     router.push('/admin/task-analysis');
            // });
        },
    });

    React.useEffect(() => {
        if (taskAnalysis) {
            const { subject, subjectTask } = taskAnalysis || {};
            const { id: subjectId, subject: subjectName } = subject || {};
            const { id: themeId, theme, number } = subjectTask || {};

            setSubject(subjectName);
            setSubjectId(subjectId);
            setTheme(`${number}. ${theme}`);
            setThemeId(themeId);
        }
    }, [taskAnalysis]);

    React.useEffect(() => {
        if (taskAnalysis && analysisEditorIsReady && analysisRef.current) {
            const { content } = taskAnalysis;

            analysisRef.current?.render({
                blocks: convertHtmlToEditorBlocks(content),
            });
        }
    }, [taskAnalysis, analysisEditorIsReady]);

    if (taskAnalysisIsLoading) {
        return <Preloader page />;
    }

    if (taskAnalysisError) {
        return <NotContent text="Произошла ошибка при загрузке данных" danger icon={<Cross />} />;
    }

    return (
        <PrivateWrapper permissions={[PERMISSIONS.ANALYSIS_TASKS]}>
            <CreatePageWrapper
                title="Редактирование разбора задания"
                button={
                    theme && (
                        <Button
                            auto
                            levitation
                            loading={editTaskAnalysisMutation.isPending}
                            onClick={() => editTaskAnalysisMutation.mutate()}
                        >
                            Сохранить
                        </Button>
                    )
                }
            >
                <div className={base.formMedium}>
                    <FakeInput title="Предмет" value={subject} />
                    <FakeInput title="Номер задания" value={theme} />

                    {theme && (
                        <Editor
                            title="Разбор задания"
                            editorRef={analysisRef}
                            id="analysisEditor"
                            onReady={() => setAnalysisEditorIsReady(true)}
                        />
                    )}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminEditTaskAnalysis;
