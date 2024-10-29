'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Checkbox, Select as SelectAnt } from 'antd';
import { Dayjs } from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import type { EditorCore } from '@/shared/ui/Editor/Editor';
import useAlert from '@/shared/hooks/useAlert';
import { isDateTimePast } from '@/shared/utils/isDateTimePast';
import { formatDate } from '@/shared/utils/formatDate';
import { DatePicker } from '@/shared/ui/DatePicker';
import { ArrowBottom, Clock, Cross } from '@/shared/icons';
import { useNotify } from '@/features/notify';
import { getHtmlInEditor } from '@/shared/utils/getHtmlInEditor';
import { useUserPermissions, useUsers } from '@/features/user';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { checkPermission } from '@/shared/utils/checkPermissions';

import { DynamicSkeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { UserOption } from '@/shared/ui/OptionComponents';
import { TimePicker } from '@/shared/ui/TimePicker';

const Editor = dynamic(() => import('@/shared/ui/Editor/Editor'), {
    ssr: false,
    loading: () => <DynamicSkeleton />,
});

const AdminNotifies = () => {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [date, setDate] = React.useState<Dayjs | null>();
    const [time, setTime] = React.useState<Dayjs>();

    const [searchValue, setSearchValue] = React.useState('');
    const [userIDs, setUserIDs] = React.useState<string[]>([]);

    const [type, setType] = React.useState<string | null>(null);

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendForOne, setSendForOne] = React.useState(false);
    const [delayedSend, setDelayedSend] = React.useState(false);

    const { sendNotify, getNotifyTypes } = useNotify();
    const { alertNotify } = useAlert();
    const { getPaginationUsersShort } = useUsers();
    const userSearchDebounce = useDebounce(searchValue, 500);

    const searchParams = useSearchParams();
    const router = useRouter();
    const usersIds = searchParams.get('users');
    const { getUserPermissions } = useUserPermissions();

    const { data: permissions } = useQuery({
        queryKey: ['user_permissions'],
        queryFn: getUserPermissions,
    });

    const {
        data: notifyTypes,
        isPending,
        isError,
    } = useQuery({
        queryKey: ['notify_types'],
        queryFn: getNotifyTypes,
    });

    const {
        data: users,
        isPending: usersIsLoading,
        isError: usersError,
    } = useQuery({
        queryKey: ['users_short_search', userSearchDebounce, userIDs],
        queryFn: () => getPaginationUsersShort(0, userSearchDebounce, userIDs),
        enabled: checkPermission(permissions || [], [PERMISSIONS.USERS]),
    });

    const editorRef = React.useRef<EditorCore | null>(null);

    const createNotify = async () => {
        if ((!date || !time) && delayedSend) {
            return alertNotify('Предупреждение', 'Укажите время и дату', 'warn');
        }

        if (delayedSend && !isDateTimePast(date, time)) {
            return alertNotify('Ошибка', 'Нельзя отправить уведомление в прошедшую дату', 'error');
        }

        if (delayedSend) {
            var newDate = formatDate(
                new Date(`${date?.format('YYYY-MM-DD')}T${time?.format('HH:mm:ss')}`),
                'YYYY-MM-DDTHH:mm:ss.SSSZ',
            );
        }

        const savedData = await editorRef.current?.save();
        const content = getHtmlInEditor(savedData?.blocks);

        if (!content) {
            return alertNotify('Предупреждение', 'Контент уведомления не должен быть пустой', 'warn');
        }

        await sendNotify(title, author, userIDs, newDate ?? '', content, type, () => {
            setTitle('');
            setAuthor('');
            setDate(undefined);
            setTime(undefined);
            setSendAnonim(false);
            setSendForOne(false);
            setDelayedSend(false);
            setType(null);
            editorRef.current?.clear();
            router.replace('/admin/notifies');
        });
    };

    const createNotifyMutation = useMutation({
        mutationFn: () => createNotify(),
    });

    React.useEffect(() => {
        if (usersIds) {
            setSendForOne(true);
            setUserIDs(usersIds.split(','));
        }
    }, [usersIds]);

    return (
        <PrivateWrapper permissions={[PERMISSIONS.NOTIFIES]}>
            <div className={base.baseWrapperGap16}>
                <div className={base.titleInner}>
                    <Text variant="h3">Отправка уведомления</Text>
                </div>

                <div className={base.formMedium}>
                    <Input value={title} setValue={setTitle} title="Заголовок" lengthLimit={100} trackLength />

                    <Checkbox checked={sendAnonim} onChange={(e) => setSendAnonim(e.target.checked)}>
                        Отправить от имени
                    </Checkbox>

                    {sendAnonim && (
                        <Input
                            value={author}
                            setValue={setAuthor}
                            title="Имя отправителя"
                            lengthLimit={30}
                            trackLength
                        />
                    )}

                    {checkPermission(permissions || [], [PERMISSIONS.USERS]) && (
                        <>
                            <Checkbox checked={sendForOne} onChange={(e) => setSendForOne(e.target.checked)}>
                                Отправить пользователю
                            </Checkbox>

                            {sendForOne && (
                                <div className={base.baseWrapperGap4}>
                                    <Text variant="text3">Пользователь</Text>

                                    <SelectAnt
                                        value={userIDs}
                                        onChange={(value) => setUserIDs(value)}
                                        allowClear={false}
                                        suffixIcon={<ArrowBottom width="16" />}
                                        notFoundContent={
                                            usersIsLoading ? (
                                                <Preloader small wrapperClassName={styles.loader} />
                                            ) : usersError ? (
                                                <NotContent
                                                    text="Произошло ошибка при загрузке данных"
                                                    danger
                                                    icon={<Cross />}
                                                    small
                                                />
                                            ) : (
                                                <NotContent text="Пользователей не найдено" />
                                            )
                                        }
                                        loading={usersIsLoading}
                                        removeIcon={<Cross width="14" />}
                                        options={users?.users.map((data) => ({
                                            label: data.nickname,
                                            value: String(data.id),
                                            id: `ID: ${data.id}`,
                                            avatar: data.avatar,
                                        }))}
                                        optionRender={({ data }) => {
                                            const { label, id, avatar } = data || {};

                                            return <UserOption id={id} avatar={avatar} nickname={label} />;
                                        }}
                                        showSearch
                                        mode="multiple"
                                        maxTagCount="responsive"
                                        filterOption={false}
                                        onSearch={(value) => setSearchValue(value.trim())}
                                        onClear={() => setSearchValue('')}
                                        className={styles.notifyUserSelect}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    <Checkbox checked={delayedSend} onChange={(e) => setDelayedSend(e.target.checked)}>
                        Отложенная отправка
                    </Checkbox>

                    {delayedSend && (
                        <div className={styles.notifiesDelayInner}>
                            <DatePicker
                                disablePrevDate
                                title="Выберите дату"
                                wrapperClass={styles.notifiesDelayItem}
                                value={date}
                                setValue={setDate}
                            />

                            <TimePicker
                                title="Выберите время"
                                format="HH:mm"
                                wrapperClass={styles.notifiesDelayItem}
                                value={time}
                                setValue={setTime}
                                suffixIcon={<Clock style={{ width: 18, color: 'var(--text)' }} />}
                            />
                        </div>
                    )}

                    {!!notifyTypes?.length && (
                        <Select
                            title="Тип уведомления"
                            notContentText="Типов уведомления не найдено"
                            loading={isPending}
                            error={isError}
                            onChange={(value) => setType(value)}
                            value={type}
                            options={notifyTypes?.map((data) => ({
                                label: data.type,
                                value: String(data.id),
                            }))}
                        />
                    )}

                    <Editor title="Сообщение" editorRef={editorRef} id="notifyEditor" />
                </div>

                <Button
                    auto
                    onClick={() => createNotifyMutation.mutate()}
                    loading={createNotifyMutation.isPending}
                    levitation
                >
                    Отправить
                </Button>
            </div>
        </PrivateWrapper>
    );
};

export default AdminNotifies;
