'use client';

import React, { ChangeEvent } from 'react';
import { Checkbox } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';
import { Button, IconButton } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import { Input } from '@/shared/ui/Input';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { EditorCore } from '@/shared/ui/Editor/Editor';
import { getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import { useSubjects } from '@/features/subjects';
import { SubjectDTO, SubjectSubThemeDTO, SubjectTaskDTO } from '@/entities/subject';
import { useTask } from '@/features/task';
import useAlert from '@/shared/hooks/useAlert';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Delete, Plus, ScanEye } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';
import { SubjectTask } from '@/entities/task';
import { Modal } from '@/shared/ui/Modal';
import TaskItem from '@/entities/task/ui/TaskItem';
import { NotContent } from '@/shared/ui/NotContent';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const AdminTaskCreate = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const [subject, setSubject] = React.useState<string | null>(null);
    const [isVerified, setIsVerified] = React.useState(false);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [answers, setAnswers] = React.useState<string[]>([]);
    const [answer, setAnswer] = React.useState('');
    const [source, setSource] = React.useState('');
    const [isDetailedAnswerTask, setIsDetailedAnswerTask] = React.useState(false);

    const [subjects, setSubjects] = React.useState<SubjectDTO[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectDTO[]>([]);
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

    const { getPagginationSubjects, getSubjectThemes, getSubjectSubThemes } = useSubjects();
    const { createTask, checkMatchTasks } = useTask();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const {
        data: subjectsData,
        isLoading: subjectsIsLoading,
        error: subjectsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
    });

    const {
        data: themesData,
        isLoading: themesIsLoading,
        error: themesError,
    } = useQuery({
        queryKey: ['themes', subject],
        queryFn: () => getSubjectThemes(String(subject)),
        enabled: !!subject,
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

    const createTaskHandler = async () => {
        if (!taskRef.current || !solutionRef.current) {
            return;
        }

        if (!subject || !theme || !subTheme) {
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

        createTask(subject, theme, subTheme, taskContent, isVerified, solutionContent, allAnswers, source, () => {
            router.back();
        });
    };

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

    const handleSearchSubThemes = (value: string) => {
        const filteredOptions = subThemes.filter((subTheme) =>
            subTheme.subTheme.toLowerCase().includes(value.toLowerCase()),
        );

        setSubThemesFilter(filteredOptions);
    };

    const getMatchTasks = async () => {
        if (!taskRef.current) {
            return;
        }

        if (!subject) {
            return alertNotify('Предупреждение', 'Для проверки схожести заданий нужно указать предмет задания', 'warn');
        }

        const taskData = await taskRef.current.save();

        const taskContent = getHtmlInEditor(taskData.blocks);

        if (!taskContent) {
            return alertNotify('Предупреждение', 'Нужно заполнить задание', 'warn');
        }

        setMatchesIsLoading(true);
        const matches = await checkMatchTasks(subject, taskContent);
        setMatchesIsLoading(false);

        if (!matches) {
            return;
        }

        setMatches(matches);
        setModalCheckMatch(true);
    };

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

    React.useEffect(() => {
        if (subThemesData) {
            setSubThemes(subThemesData);
            setSubThemesFilter(subThemesData);
        }
    }, [subThemesData]);

    React.useEffect(() => {
        if (subject) {
            setTheme(null);
            setThemes([]);
            setSubTheme(null);
            setSubThemes([]);
        }
    }, [subject]);

    React.useEffect(() => {
        if (theme) {
            setSubTheme(null);
            setSubThemes([]);
        }
    }, [theme]);

    return (
        <>
            <CreatePageDefault
                title="Создание задания"
                button={
                    subTheme && (
                        <Button auto levitation onClick={createTaskHandler}>
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
                        value={subject}
                        onChange={(value) => setSubject(value)}
                        options={subjectsFilter?.map((data) => {
                            return {
                                label: data.subject,
                                value: String(data.id),
                            };
                        })}
                        showSearch
                        onSearch={handleSearchSubjects}
                        filterOption={false}
                    />

                    {subject && (
                        <Select
                            title="Номер задания"
                            notContentText="Заданий не найдено"
                            loading={themesIsLoading}
                            value={theme}
                            onChange={(value) => setTheme(value)}
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
                            loading={subThemesIsLoading}
                            value={subTheme}
                            onChange={(value) => setSubTheme(value)}
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

                    {subTheme && (
                        <>
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
                        </>
                    )}
                </div>
            </CreatePageDefault>

            <Modal value={modalCheckMatch} setValue={setModalCheckMatch} title="Схожие задания">
                <div className={styles.matchItems}>
                    {!!matches?.length ? (
                        matches?.map((data) => (
                            <TaskItem
                                key={data.task.id}
                                data={data.task}
                                edit={checkPermission(permissions, [PERMISSIONS.UPDATE_SUBJECTS])}
                                remove={checkPermission(permissions, [PERMISSIONS.DELETE_SUBJECTS])}
                                matchPercent={data.percent}
                            />
                        ))
                    ) : (
                        <NotContent text="Схожих заданий не найдено" />
                    )}
                </div>
            </Modal>
        </>
    );
};

export default AdminTaskCreate;
