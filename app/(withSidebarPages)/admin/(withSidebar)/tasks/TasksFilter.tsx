import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import type { SubjectFilter, SubjectSubTheme, SubjectTheme } from '@/entities/subject';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';
import { buildQueryString } from '@/shared/utils/buildQueryString';
import { useUserPermissions, useUsers } from '@/features/user';
import { useSubjects } from '@/features/subjects';
import { useDebounce } from '@/shared/hooks/useDebounce';

import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';
import { Modal } from '@/shared/ui/Modal';
import { UserOption } from '@/shared/ui/OptionComponents';

type Props = {
    filterOpen: boolean;
    setFilterOpen: (value: boolean) => void;
    subjectId: string | null;
    themeId: string | null;
    subThemeId: string | null;
    isVerified: string | null;
    userId: string | null;
};

const TasksFilter: React.FC<Props> = ({
    filterOpen,
    setFilterOpen,
    subjectId,
    themeId,
    subThemeId,
    isVerified,
    userId,
}) => {
    const router = useRouter();

    const { getPaginationUsersShort } = useUsers();
    const { getUserPermissions } = useUserPermissions();
    const { getPagginationSubjects, getSubjectThemes, getSubjectSubThemes } = useSubjects();

    const [searchValue, setSearchValue] = React.useState('');
    const userSearchDebounce = useDebounce(searchValue, 500);

    const [subject, setSubject] = React.useState<string | null>(null);
    const [theme, setTheme] = React.useState<string | null>(null);
    const [subTheme, setSubTheme] = React.useState<string | null>(null);
    const [verify, setVerify] = React.useState<string | null>(null);
    const [user, setUser] = React.useState<string | null>(null);

    const [subjects, setSubjects] = React.useState<SubjectFilter[]>([]);
    const [subjectsFilter, setSubjectsFilter] = React.useState<SubjectFilter[]>([]);
    const [themes, setThemes] = React.useState<SubjectTheme[]>([]);
    const [themesFilter, setThemesFilter] = React.useState<SubjectTheme[]>([]);
    const [subThemes, setSubThemes] = React.useState<SubjectSubTheme[]>([]);
    const [subThemesFilter, setSubThemesFilter] = React.useState<SubjectSubTheme[]>([]);

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const { data: users, isPending: usersIsLoading } = useQuery({
        queryKey: ['users_short_search', userSearchDebounce],
        queryFn: () => getPaginationUsersShort(0, userSearchDebounce),
        enabled: checkPermission(permissions || [], [PERMISSIONS.USERS]),
    });

    const handleSearchSubject = (value: string) => {
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

    const resetFilter = () => {
        setFilterOpen(false);
        setSubject(null);
        setTheme(null);
        setSubTheme(null);
        setUser(null);
        setVerify(null);
        router.replace('/admin/tasks');
    };

    const applyFilters = () => {
        const newUrl = buildQueryString({
            subject_id: subject,
            subject_task_id: theme,
            subTheme_id: subTheme,
            is_verified: verify,
            user_id: user,
        });
        router.replace(`?${newUrl}`);
        setFilterOpen(false);
    };

    const { data: subjectsData, isLoading: subjectsIsLoading } = useQuery({
        queryKey: ['subjects'],
        queryFn: () => getPagginationSubjects(0, 9999),
        enabled: checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
    });

    const { data: themesData, isLoading: themesIsLoading } = useQuery({
        queryKey: ['themes', subject],
        queryFn: () => getSubjectThemes(String(subject)),
        enabled: !!subject && checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
    });

    const { data: subThemesData, isLoading: subThemesIsLoading } = useQuery({
        queryKey: ['subthemes', theme],
        queryFn: () => getSubjectSubThemes(String(theme)),
        enabled: !!theme && checkPermission(permissions || [], [PERMISSIONS.SUBJECTS]),
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

    React.useEffect(() => {
        if (subThemesData) {
            setSubThemes(subThemesData);
            setSubThemesFilter(subThemesData);
        }
    }, [subThemesData]);

    React.useEffect(() => {
        if (subjectId) {
            setSubject(subjectId);
        }
    }, [subjectId]);

    React.useEffect(() => {
        if (themeId) {
            setTheme(themeId);
        }
    }, [themeId]);

    React.useEffect(() => {
        if (subThemeId) {
            setSubTheme(subThemeId);
        }
    }, [subThemeId]);

    React.useEffect(() => {
        if (userId) {
            setUser(userId);
        }
    }, [userId]);

    React.useEffect(() => {
        if (isVerified) {
            setVerify(isVerified);
        }
    }, [isVerified]);

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
                    setTheme(null);
                    setSubTheme(null);
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

            {subject && (
                <Select
                    title="Задание"
                    notContentText="Заданий не найдено"
                    loading={themesIsLoading}
                    value={theme}
                    onChange={(value) => {
                        setTheme(value);
                        setThemesFilter(themes);
                        setSubTheme(null);
                    }}
                    clear
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
                    value={subTheme}
                    onChange={(value) => {
                        setSubTheme(value);
                        setSubThemesFilter(subThemes);
                    }}
                    clear
                    options={subThemesFilter?.map((data) => ({
                        label: data.subTheme,
                        value: String(data.id),
                    }))}
                    showSearch
                    onSearch={handleSearchSubThemes}
                    filterOption={false}
                />
            )}

            {checkPermission(permissions || [], [PERMISSIONS.USERS]) && (
                <Select
                    title="Пользователь"
                    loading={usersIsLoading}
                    showSearch
                    notContentText="Пользователей не найдено"
                    onSearch={(value) => setSearchValue(value.trim())}
                    onChange={(value) => setUser(value)}
                    onClear={() => setSearchValue('')}
                    filterOption={false}
                    value={user}
                    clear
                    options={users?.users?.map((data) => ({
                        label: data.nickname,
                        value: String(data.id),
                        id: `ID: ${data.id}`,
                        avatar: data.avatar,
                    }))}
                    optionRender={({ data }) => {
                        const { id, avatar, label } = data || {};

                        return <UserOption id={id} nickname={label} avatar={avatar} />;
                    }}
                />
            )}

            <Select
                title="Проверенные"
                onChange={(value) => setVerify(value)}
                value={verify}
                clear
                options={[
                    {
                        label: 'Да',
                        value: 'true',
                    },
                    {
                        label: 'Нет',
                        value: 'false',
                    },
                ]}
            />

            <Button variant="light" color="danger" onClick={resetFilter}>
                Сбросить
            </Button>

            <Button onClick={applyFilters}>Применить</Button>
        </Modal>
    );
};

export default TasksFilter;
