'use client';

import React, { ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import { Checkbox } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from '../index.module.scss';

import type { SubjectFilter, SubjectSubTheme, SubjectTheme } from '@/entities/subject';
import type { SubjectTask } from '@/entities/task';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import { useSubjects } from '@/features/subjects';
import { useTask } from '@/features/task';
import useAlert from '@/shared/hooks/useAlert';
import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Delete, Plus, ScanEye, Shufle } from '@/shared/icons';
import { Text } from '@/shared/ui/Text';
import TaskItem from '@/entities/task/ui/TaskItem';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { generatePairs } from '@/shared/utils/generatePairs';
import { useUserPermissions } from '@/features/user';
import { useHandlers } from '@/features/collection';

import { Button, IconButton } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import { Input } from '@/shared/ui/Input';
import { EditorCore } from '@/shared/ui/Editor/Editor';
import { Modal } from '@/shared/ui/Modal';
import { NotContent } from '@/shared/ui/NotContent';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const AdminTaskCreate = () => {
    const { getUserPermissions } = useUserPermissions();
    const { scrollTop } = useHandlers();

    const {
        data: permissions,
        isLoading: permissionsIsLoading,
        isError: permissionsError,
    } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const [subject, setSubject] = React.useState<string | null>(null);
    const [isVerified, setIsVerified] = React.useState(false);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [answers, setAnswers] = React.useState<string[]>(['']);
    const [source, setSource] = React.useState('');
    const [isDetailedAnswer, setIsDetailedAnswer] = React.useState(false);

    const [subjects, setSubjects] = React.useState<SubjectFilter[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectFilter[]>([]);
    const [themes, setThemes] = React.useState<SubjectTheme[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTheme[]>([]);
    const [subThemes, setSubThemes] = React.useState<SubjectSubTheme[]>([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState<SubjectSubTheme[]>([]);

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

    const {
        data: subThemesData,
        isLoading: subThemesIsLoading,
        isError: subThemesError,
    } = useQuery({
        queryKey: ['subthemes', theme],
        queryFn: () => getSubjectSubThemes(String(theme)),
        enabled: !!theme,
    });

    const addAnswer = () => {
        if (!(answers[answers.length - 1] || '').trim()) {
            return;
        }

        setAnswers((prev) => [...prev, '']);
    };

    const removeAnswer = (id: number) => {
        let newAnswers = [...answers];

        newAnswers.splice(id, 1);
        setAnswers(newAnswers);
    };

    const changeAnswer = (value: string, id: number) => {
        let newAnswers = [...answers];

        newAnswers[id] = value;
        setAnswers(newAnswers);
    };

    const createTaskHandler = async () => {
        if (!taskRef.current || !solutionRef.current) return;

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

        const lastAnswer = (answers[answers.length - 1] || '').trim();
        let allAnswers = lastAnswer ? answers : answers.slice(0, -1);

        createTask(
            subject,
            theme,
            subTheme,
            taskContent,
            isVerified,
            solutionContent,
            isDetailedAnswer ? [] : allAnswers,
            source,
            () => {
                router.back();
                scrollTop();
            },
        );
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
        if (!taskRef.current) return;

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

        if (!matches) return;

        setMatches(matches);
        setModalCheckMatch(true);
    };

    const generateAnswers = () => {
        if (!answers.length || !answers[0]) return;

        const variants = answers[0].trim().split(' ');

        if (variants.length > 4) {
            return alertNotify(
                'Предупреждение',
                'Максимальное количество вариантов ответа - 4, убедитесь, что все данные введены корректно',
                'warn',
                '',
                4000,
            );
        }

        setAnswers(generatePairs(variants));
    };

    React.useEffect(() => {
        if (theme) {
            const foundTheme = themes.find((item) => String(item.id) === theme);

            if (!foundTheme) return;

            setIsDetailedAnswer(foundTheme.isDetailedAnswer);
        }
    }, [theme]);

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

    return (
        <PrivateWrapper permissions={[PERMISSIONS.CREATE_TASKS]}>
            <CreatePageWrapper
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
                        error={subjectsError}
                        value={subject}
                        onChange={(value) => {
                            setTheme(null);
                            setThemes([]);
                            setSubTheme(null);
                            setSubThemes([]);
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
                                setSubTheme(null);
                                setSubThemes([]);
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

                    {theme && (
                        <Select
                            title="Тема"
                            notContentText="Тем не найдено"
                            loading={subThemesIsLoading}
                            error={subThemesError}
                            value={subTheme}
                            onChange={(value) => setSubTheme(value)}
                            options={subThemesFilter?.map((data) => ({
                                label: data.subTheme,
                                value: String(data.id),
                            }))}
                            showSearch
                            onSearch={handleSearchSubThemes}
                            filterOption={false}
                        />
                    )}

                    {subTheme && (
                        <>
                            {checkPermission(permissions || [], [PERMISSIONS.VERIFY_TASKS]) && (
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

                            {!isDetailedAnswer && (
                                <>
                                    <div className={styles.answerWrapper}>
                                        <Text variant="text3">
                                            Ответ{answers.length > 1 && 'ы'}{' '}
                                            {answers.length > 1 && `(${answers.length})`}
                                        </Text>
                                        {!!answers.length &&
                                            answers.map((answer, id) => (
                                                <div key={id} className={styles.answerItem}>
                                                    <Input value={answer} onInputChange={(value) => changeAnswer(value, id)} />

                                                    {answers.length > 1 && (
                                                        <IconButton
                                                            variant="danger"
                                                            small
                                                            circle
                                                            className={styles.answerItemDelete}
                                                            onClick={() => removeAnswer(id)}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    )}
                                                </div>
                                            ))}

                                        <Text variant="text3" color="error" fontWeight={600}>
                                            Регистр ответа учитывает система, в ответ нужно указать слово или
                                            последовательность в обычном регистре
                                        </Text>

                                        <Text variant="text3" fontWeight={600}>
                                            Если в ответе порядок записи не важен, то можете ввести в ответ варианты
                                            через пробел и нажать кнопку «Порядок неважен»
                                        </Text>
                                    </div>

                                    <Button variant="light" auto onClick={generateAnswers} disabled={!answers[0]}>
                                        <Shufle />
                                        Порядок неважен
                                    </Button>

                                    <Button variant="light" auto onClick={addAnswer}>
                                        <Plus />
                                        Добавить ответ
                                    </Button>
                                </>
                            )}

                            <Input title="Источник" value={source} setValue={setSource} />
                        </>
                    )}
                </div>
            </CreatePageWrapper>

            <Modal value={modalCheckMatch} setValue={setModalCheckMatch} title="Схожие задания">
                <div className={styles.matchItems}>
                    {!!matches?.length ? (
                        matches?.map((data) => (
                            <TaskItem
                                key={data.task.id}
                                data={data.task}
                                edit={checkPermission(permissions || [], [PERMISSIONS.UPDATE_SUBJECTS])}
                                remove={checkPermission(permissions || [], [PERMISSIONS.DELETE_SUBJECTS])}
                                matchPercent={data.percent}
                                href={`/admin/task/${data.task.id}`}
                            />
                        ))
                    ) : (
                        <NotContent text="Схожих заданий не найдено" />
                    )}
                </div>
            </Modal>
        </PrivateWrapper>
    );
};

export default AdminTaskCreate;
