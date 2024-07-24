'use client';

import React from 'react';
import { Checkbox } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

import base from '@/shared/styles/base.module.scss';

import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';
import { Button } from '@/shared/ui/Button';
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
import { Preloader } from '@/shared/ui/Preloader';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <Preloader small page />,
});

const AdminTaskCreate = () => {
    const permissions = useAppSelector((state) => state.user.user?.permissions);

    const [subject, setSubject] = React.useState<string | null>(null);
    const [isVerified, setIsVerified] = React.useState(false);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [answer, setAnswer] = React.useState('');
    const [source, setSource] = React.useState('');
    const [isDetailedAnswerTask, setIsDetailedAnswerTask] = React.useState(false);

    const [subjects, setSubjects] = React.useState<SubjectDTO[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectDTO[]>([]);
    const [subjectsDroped, setSubjectsDroped] = React.useState(false);
    const [themes, setThemes] = React.useState<SubjectTaskDTO[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTaskDTO[]>([]);
    const [themesDroped, setThemesDroped] = React.useState(false);
    const [subThemes, setSubThemes] = React.useState<SubjectSubThemeDTO[]>([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState<SubjectSubThemeDTO[]>([]);
    const [subThemesDroped, setSubThemesDroped] = React.useState(false);

    const taskRef = React.useRef<EditorCore | null>(null);
    const solutionRef = React.useRef<EditorCore | null>(null);

    const { getPagginationSubjects, getSubjectThemes, getSubjectSubThemes } = useSubjects();
    const { createTask } = useTask();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const {
        data: subjectsData,
        isLoading: subjectsIsLoading,
        error: subjectsError,
    } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects({ pageParam: 0, limit: 9999 }),
        enabled: subjectsDroped,
    });

    const {
        data: themesData,
        isLoading: themesIsLoading,
        error: themesError,
        refetch: refetchThemes,
    } = useQuery({
        queryKey: ['themes'],
        queryFn: () => getSubjectThemes(String(subject)),
        enabled: themesDroped && !!subject,
    });

    const {
        data: subThemesData,
        isLoading: subThemesIsLoading,
        error: subThemesError,
        refetch: refetchSubThemes,
    } = useQuery({
        queryKey: ['subthemes'],
        queryFn: () => getSubjectSubThemes(String(theme)),
        enabled: subThemesDroped && !!theme,
    });

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

        createTask(subject, theme, subTheme, taskContent, isVerified, solutionContent, answer, source, () => {
            router.replace('/admin/tasks');
        });
    };

    const subjectDropdown = (open: boolean) => {
        if (open && subjects.length === 0) {
            setSubjectsDroped(true);
        }
    };

    const themeDropdown = (open: boolean) => {
        if (open && themes.length === 0 && subject) {
            setThemesDroped(true);
        }
    };

    const subThemeDropdown = (open: boolean) => {
        if (open && subThemes.length === 0 && theme) {
            setSubThemesDroped(true);
        }
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
            refetchThemes();
        }
    }, [subject]);

    React.useEffect(() => {
        if (theme) {
            setSubTheme(null);
            setSubThemes([]);
            refetchSubThemes();
        }
    }, [theme]);

    return (
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
                    onDropdownVisibleChange={subjectDropdown}
                    value={subject}
                    onChange={(value) => {
                        setSubject(value);
                        setSubjectsFilter(subjects);
                    }}
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
                        onDropdownVisibleChange={themeDropdown}
                        value={theme}
                        onChange={(value) => {
                            setTheme(value);
                            setThemesFilter(themes);
                        }}
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
                        onDropdownVisibleChange={subThemeDropdown}
                        value={subTheme}
                        onChange={(value) => {
                            setSubTheme(value);
                            setSubThemesFilter(subThemes);
                        }}
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
                        <Editor title="Решение" editorRef={solutionRef} id="answerEditor" />

                        <Input title="Ответ" value={answer} setValue={setAnswer} />
                        <Input title="Источник" value={source} setValue={setSource} />
                    </>
                )}
            </div>
        </CreatePageDefault>
    );
};

export default AdminTaskCreate;
