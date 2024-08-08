'use client';

import React, { ChangeEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import styles from '../../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';
import { Button, IconButton } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import { Checkbox } from 'antd';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { EditorCore } from '@/shared/ui/Editor/Editor';
import useAlert from '@/shared/hooks/useAlert';
import { useTask } from '@/features/task';
import { SubjectSubThemeDTO, SubjectTaskDTO } from '@/entities/subject';
import { useSubjects } from '@/features/subjects';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@/shared/ui/Text';
import { convertHtmlToEditorBlocks, getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Delete, Plus, ScanEye } from '@/shared/icons';
import { Modal } from '@/shared/ui/Modal';
import { SubjectTask } from '@/entities/task';
import TaskItem from '@/entities/task/ui/TaskItem';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const AdminTaskEdit = () => {
    const { id } = useParams();
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const [subject, setSubject] = React.useState<string | null>(null);
    const [subjectId, setSubjectId] = React.useState<number>();
    const [isVerified, setIsVerified] = React.useState(false);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [answers, setAnswers] = React.useState<string[]>([]);
    const [answer, setAnswer] = React.useState('');
    const [source, setSource] = React.useState('');
    const [isDetailedAnswerTask, setIsDetailedAnswerTask] = React.useState(false);
    const [editingIsLoading, setEditingIsLoading] = React.useState(false);

    const [themes, setThemes] = React.useState<SubjectTaskDTO[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTaskDTO[]>([]);
    const [subThemes, setSubThemes] = React.useState<SubjectSubThemeDTO[]>([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState<SubjectSubThemeDTO[]>([]);

    const [modalCheckMatch, setModalCheckMatch] = React.useState(false);
    const [matchesIsLoading, setMatchesIsLoading] = React.useState(false);
    const [matches, setMatches] = React.useState<
        {
            task: SubjectTask;
            percent: number;
        }[]
    >();

    const taskRef = React.useRef<EditorCore | null>(null);
    const solutionRef = React.useRef<EditorCore | null>(null);

    const { getSubjectThemes, getSubjectSubThemes } = useSubjects();
    const { editTask, getTaskById, checkMatchTasks } = useTask();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const {
        data,
        isLoading: taskIsLoading,
        error,
    } = useQuery({
        queryKey: ['task_by_id', id],
        queryFn: () => getTaskById(String(id), true),
        enabled: !!id,
    });

    const {
        data: themesData,
        isLoading: themesIsLoading,
        error: themesError,
    } = useQuery({
        queryKey: ['themes', subjectId],
        queryFn: () => getSubjectThemes(String(subjectId)),
        enabled: !!subjectId,
    });

    const {
        data: subThemesData,
        isLoading: subThemesIsLoading,
        error: subThemesError,
    } = useQuery({
        queryKey: ['subthemes', theme],
        queryFn: () => getSubjectSubThemes(String(theme)),
        enabled: !!theme,
    });

    const getMatchTasks = async () => {
        if (!taskRef.current || !id) {
            return;
        }

        if (!subjectId) {
            return alertNotify('Предупреждение', 'Для проверки схожести заданий нужно указать предмет задания', 'warn');
        }

        const taskData = await taskRef.current.save();

        const taskContent = getHtmlInEditor(taskData.blocks);

        if (!taskContent) {
            return alertNotify('Предупреждение', 'Нужно заполнить задание', 'warn');
        }

        setMatchesIsLoading(true);
        const matches = await checkMatchTasks(subjectId, taskContent, String(id));
        setMatchesIsLoading(false);

        if (!matches) {
            return;
        }

        setMatches(matches);
        setModalCheckMatch(true);
    };

    const addAnswer = () => {
        if (!answer) {
            return;
        }

        setAnswers((prev) => [...prev, answer]);
        setAnswer('');
    };

    const removeAnswer = (id: number) => {
        let newAnswers = [...answers];

        newAnswers.splice(id, 1);
        setAnswers(newAnswers);
    };

    const removeAnswerForm = () => {
        const lastAnswer = answers.splice(-1)[0];
        setAnswer(lastAnswer);
        setAnswers(answers);
    };

    const changeAnswer = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, id: number) => {
        let newAnswers = [...answers];

        newAnswers[id] = e.target.value;
        setAnswers(newAnswers);
    };

    const editTaskHandler = async () => {
        if (!taskRef.current || !solutionRef.current) {
            return;
        }

        if (!subjectId || !theme || !subTheme) {
            return alertNotify('Предупреждение', 'Предмет, задание и тема не может быть пустой', 'warn');
        }

        const taskData = await taskRef.current.save();
        const solutionData = await solutionRef.current.save();

        const taskContent = getHtmlInEditor(taskData.blocks);
        const solutionContent = getHtmlInEditor(solutionData.blocks);

        if (!taskContent) {
            return alertNotify('Предупреждение', 'Нужно заполнить задание', 'warn');
        }

        const trimAnswer = (answer || '').trim();
        let allAnswers = trimAnswer ? [...answers, trimAnswer] : [...answers];

        editTask(
            String(id),
            subjectId,
            theme,
            subTheme,
            taskContent,
            isVerified,
            solutionContent,
            allAnswers,
            source,
            () => {
                router.back();
            },
        );
    };

    const handleSearchThemes = (value: string) => {
        const filteredOptions = themes.filter((theme) => {
            const themeTemp = `${theme.number}. ${theme.theme}`;
            return themeTemp.toLowerCase().includes(value.toLowerCase());
        });

        setThemesFilter(filteredOptions);
    };

    const handleSearchSubThemes = (value: string) => {
        const filteredOptions = subThemes.filter((subTheme) =>
            subTheme.subTheme.toLowerCase().includes(value.toLowerCase()),
        );

        setSubThemesFilter(filteredOptions);
    };

    React.useEffect(() => {
        if (data) {
            const { subject, isVerified, source, answers, solution, task, subjectTask, subTheme } = data;

            setSubjectId(subject?.id);
            setSubject(subject?.subject);

            const taskTheme = subjectTask?.id ? String(subjectTask?.id) : null;
            const taskSubTheme = subTheme?.id ? String(subTheme?.id) : null;

            setTheme(taskTheme);
            setSubTheme(taskSubTheme);
            setIsVerified(isVerified);

            const lastAnswer = answers.splice(-1)[0];
            setAnswer(lastAnswer);
            setAnswers(answers);

            setSource(source);
            setEditingIsLoading(true);

            setTimeout(() => {
                taskRef.current?.render({
                    blocks: convertHtmlToEditorBlocks(task),
                });
                solutionRef.current?.render({
                    blocks: convertHtmlToEditorBlocks(solution),
                });
            }, 1000);
        }
    }, [data]);

    React.useEffect(() => {
        if (themesData) {
            setThemes(themesData);
            setThemesFilter(themesData);
        }
    }, [themesData]);

    React.useEffect(() => {
        if (subThemesData) {
            setSubThemes(subThemesData);
            setSubThemesFilter(subThemesData);
        }
    }, [subThemesData]);

    React.useEffect(() => {
        if (editingIsLoading) {
            return setEditingIsLoading(false);
        }

        if (theme) {
            setSubTheme(null);
            setSubThemes([]);
        }
    }, [theme]);

    if (taskIsLoading) {
        return <Preloader page />;
    }

    return (
        <>
            <CreatePageDefault
                title="Редактирование задания"
                button={
                    subTheme && (
                        <Button auto levitation onClick={editTaskHandler}>
                            Сохранить
                        </Button>
                    )
                }
            >
                <div className={base.formMedium}>
                    <div className={base.baseWrapperGap4}>
                        <Text variant="text3">Предмет</Text>

                        <div className={styles.selectDisabled}>{subject}</div>
                    </div>

                    {subject && (
                        <Select
                            title="Номер задания"
                            notContentText="Заданий не найдено"
                            value={theme}
                            onChange={(value) => {
                                setTheme(value);
                                setThemesFilter(themes);
                            }}
                            loading={themesIsLoading}
                            options={themesFilter?.map((data) => {
                                return {
                                    label: `${data.number}. ${data.theme}`,
                                    value: String(data.id),
                                };
                            })}
                            showSearch
                            onSearch={handleSearchThemes}
                            filterOption={false}
                        />
                    )}

                    {theme && (
                        <Select
                            title="Тема"
                            notContentText="Тем не найдено"
                            value={subTheme}
                            onChange={(value) => {
                                setSubTheme(value);
                                setSubThemesFilter(subThemes);
                            }}
                            loading={subThemesIsLoading}
                            options={subThemesFilter?.map((data) => {
                                return {
                                    label: data.subTheme,
                                    value: String(data.id),
                                };
                            })}
                            showSearch
                            onSearch={handleSearchSubThemes}
                            filterOption={false}
                        />
                    )}

                    {checkPermission(permissions, [PERMISSIONS.VERIFY_TASKS]) && (
                        <Checkbox checked={isVerified} onChange={(e) => setIsVerified(e.target.checked)}>
                            Задание проверено
                        </Checkbox>
                    )}

                    <Editor title="Задание" editorRef={taskRef} id="taskEditor" />

                    <Button variant="light" auto onClick={getMatchTasks} loading={matchesIsLoading}>
                        <ScanEye />
                        Проверить схожесть
                    </Button>

                    <Editor title="Решение" editorRef={solutionRef} id="answerEditor" />

                    <div className={styles.answerWrapper}>
                        <Text variant="text3">Ответ{!!answers.length && 'ы'}</Text>
                        {answers.map((answer, id) => (
                            <div key={id} className={styles.answerItem}>
                                <Input value={answer} onChange={(e) => changeAnswer(e, id)} />

                                <IconButton
                                    variant="danger"
                                    small
                                    circle
                                    className={styles.answerItemDelete}
                                    onClick={() => removeAnswer(id)}
                                >
                                    <Delete />
                                </IconButton>
                            </div>
                        ))}

                        <div className={styles.answerItem}>
                            <Input value={answer} setValue={setAnswer} />

                            {!!answers.length && (
                                <IconButton
                                    variant="danger"
                                    small
                                    circle
                                    className={styles.answerItemDelete}
                                    onClick={removeAnswerForm}
                                >
                                    <Delete />
                                </IconButton>
                            )}
                        </div>
                    </div>

                    <Button variant="light" auto onClick={addAnswer}>
                        <Plus />
                        Добавить ответ
                    </Button>

                    <Input title="Источник" value={source} setValue={setSource} />
                </div>
            </CreatePageDefault>

            <Modal value={modalCheckMatch} setValue={setModalCheckMatch} title="Схожие задания">
                <div className={styles.matchItems}>
                    {matches?.map((data) => (
                        <TaskItem
                            key={data.task.id}
                            data={data.task}
                            edit={checkPermission(permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
                            remove={checkPermission(permissions, [PERMISSIONS.DELETE_SUBJECTS])}
                            matchPercent={data.percent}
                        />
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default AdminTaskEdit;
