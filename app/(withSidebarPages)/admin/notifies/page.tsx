<<<<<<< HEAD
'use client';

import React from 'react';
import { Checkbox, Select, TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
// import dynamic from 'next/dynamic';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import useAlert from '@/shared/hooks/useAlert';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { isDateTimePast } from '@/shared/utils/isDateTimePast';
import { formatDate } from '@/shared/utils/formatDate';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Clock } from '@/shared/icons';
import useNotify from '@/features/notify/useNotify';

// const EditorNoSSR = dynamic(() => import('@/shared/ui/Editor').then((module) => module.Editor), {
//     ssr: false,
// });

const AdminNotifies = () => {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [date, setDate] = React.useState<Dayjs>();
    const [time, setTime] = React.useState<Dayjs>();

    const [searchValue, setSearchValue] = React.useState('');
    const [userSelectOpen, setUserSelectOpen] = React.useState(false);
    const [userOptions, setUserOptions] = React.useState<string[]>([]);
    const [userIDs, setUserIDs] = React.useState<number[]>([]);

    const [type, setType] = React.useState(1);
    const [typeOptions, setTypeOptions] = React.useState([]);

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendForOne, setSendForOne] = React.useState(false);
    const [delayedSend, setDelayedSend] = React.useState(false);

    const { sendNotify } = useNotify();
    const { alertNotify } = useAlert();

    // const searchUsersRef = React.useRef(null);
    // const editorRef = React.useRef(null);

    const createNotify = async () => {
        if ((!date || !time) && delayedSend) {
            return alertNotify('Ошибка', 'Укажите время и дату', 'error');
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

        // const savedData = await editorRef.current?.save();
        // const content = getHtmlInEditor(savedData.blocks);

        sendNotify(title, author, userIDs, newDate ?? '', 'content', type, () => {
            setTitle('');
            setAuthor('');
            setDate(undefined);
            setTime(undefined);
            setSendAnonim(false);
            setSendForOne(false);
            setDelayedSend(false);
        });
    };

    const searchUsersHandler = () => {
        setUserOptions([]);
        // searchUsers(searchValue, true).then((users) => {
        //     if (!users) {
        //         return;
        //     }

        //     setUserOptions(users.users);
        // });
    };

    const handleDropdownVisibleUsersChange = (open: boolean) => {
        setUserSelectOpen(open);

        if (open && userOptions.length === 0) {
            searchUsersHandler();
        }
    };

    // const handleDropdownVisibleTypeChange = (open) => {
    //     if (open && typeOptions.length === 0) {
    //         getNotifyTypes().then((types) => {
    //             if (!types) {
    //                 return;
    //             }

    //             setTypeOptions(types.data.notifyTypes);
    //         });
    //     }
    // };

    // React.useEffect(() => {
    //     if (!userSelectOpen) {
    //         return;
    //     }

    //     searchUsersRef.current = setTimeout(searchUsersHandler, 500);

    //     return () => {
    //         clearTimeout(searchUsersRef.current);
    //     };
    // }, [searchValue]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">Отправка уведомления</Text>
            </div>

            <div className={base.formMedium}>
                <Input
                    value={title}
                    setValue={setTitle}
                    title="Заголовок"
                    placeholder="Введите текст"
                    lengthLimit={100}
                    trackLength
                />

                <Checkbox checked={sendAnonim} onChange={(e) => setSendAnonim(e.target.checked)}>
                    Отправить от имени
                </Checkbox>

                {sendAnonim && (
                    <Input
                        value={author}
                        setValue={setAuthor}
                        placeholder="Имя / никнейм"
                        title="От кого отправить"
                        lengthLimit={30}
                        trackLength
                    />
                )}

                <Checkbox checked={sendForOne} onChange={(e) => setSendForOne(e.target.checked)}>
                    Отправить пользователю
                </Checkbox>

                {sendForOne && (
                    <Select
                        showSearch
                        placeholder="Пользователь"
                        mode="multiple"
                        maxTagCount="responsive"
                        // notContentText="Пользователей не найдено"
                        loading={false}
                        onSearch={(value: string) => setSearchValue(value.trim())}
                        onDropdownVisibleChange={handleDropdownVisibleUsersChange}
                        onChange={(value: number[]) => setUserIDs(value)}
                        filterOption={false}
                        // options={userOptions.map((data) => {
                        //     return {
                        //         label: data.nickname,
                        //         value: data.id,
                        //     };
                        // })}
                    />
                )}

                <Checkbox checked={delayedSend} onChange={(e) => setDelayedSend(e.target.checked)}>
                    Отложенная отправка
                </Checkbox>

                {delayedSend && (
                    <div className={styles.notifiesDelayInner}>
                        <DatePicker
                            disablePrevDate
                            placeholder="Выберите дату"
                            wrapperClass={styles.notifiesDelayItem}
                            value={date}
                            // @ts-ignore
                            setValue={setDate}
                        />
                        <TimePicker
                            placeholder="Выберите время"
                            format="HH:mm"
                            className={styles.notifiesDelayItem}
                            value={time}
                            onChange={(e) => setTime(e ?? undefined)}
                            suffixIcon={<Clock style={{ width: 18, color: 'var(--text)' }} />}
                        />
                    </div>
                )}

                {/* <Select
                    placeholder="Тип уведомления"
                    notContentText="Типов уведомления не найдено"
                    loading={notifyTypesIsLoading}
                    onDropdownVisibleChange={handleDropdownVisibleTypeChange}
                    onChange={(value) => setType(value)}
                    options={typeOptions.map((data) => {
                        return {
                            label: data.type,
                            value: data.id,
                        };
                    })}
                />*/}

                {/* <EditorNoSSR placeholder="Сообщение" ref={editorRef} id="notifyEditor" /> */}
            </div>

            <Button auto onClick={createNotify} levitation>
                Отправить
            </Button>
        </div>
    );
};

export default AdminNotifies;
=======
'use client';

import React from 'react';
import { Checkbox, Select, TimePicker } from 'antd';
import { Dayjs } from 'dayjs';
// import dynamic from 'next/dynamic';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import useAlert from '@/shared/hooks/useAlert';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { isDateTimePast } from '@/shared/utils/isDateTimePast';
import { formatDate } from '@/shared/utils/formatDate';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Clock } from '@/shared/icons';
import useNotify from '@/features/notify/useNotify';

// const EditorNoSSR = dynamic(() => import('@/shared/ui/Editor').then((module) => module.Editor), {
//     ssr: false,
// });

const AdminNotifies = () => {
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [date, setDate] = React.useState<Dayjs>();
    const [time, setTime] = React.useState<Dayjs>();

    const [searchValue, setSearchValue] = React.useState('');
    const [userSelectOpen, setUserSelectOpen] = React.useState(false);
    const [userOptions, setUserOptions] = React.useState<string[]>([]);
    const [userIDs, setUserIDs] = React.useState<number[]>([]);

    const [type, setType] = React.useState(1);
    const [typeOptions, setTypeOptions] = React.useState([]);

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendForOne, setSendForOne] = React.useState(false);
    const [delayedSend, setDelayedSend] = React.useState(false);

    const { sendNotify } = useNotify();
    const { alertNotify } = useAlert();

    // const searchUsersRef = React.useRef(null);
    // const editorRef = React.useRef(null);

    const createNotify = async () => {
        if ((!date || !time) && delayedSend) {
            return alertNotify('Ошибка', 'Укажите время и дату', 'error');
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

        // const savedData = await editorRef.current?.save();
        // const content = getHtmlInEditor(savedData.blocks);

        sendNotify(title, author, userIDs, newDate ?? '', 'content', type, () => {
            setTitle('');
            setAuthor('');
            setDate(undefined);
            setTime(undefined);
            setSendAnonim(false);
            setSendForOne(false);
            setDelayedSend(false);
        });
    };

    const searchUsersHandler = () => {
        setUserOptions([]);
        // searchUsers(searchValue, true).then((users) => {
        //     if (!users) {
        //         return;
        //     }

        //     setUserOptions(users.users);
        // });
    };

    const handleDropdownVisibleUsersChange = (open: boolean) => {
        setUserSelectOpen(open);

        if (open && userOptions.length === 0) {
            searchUsersHandler();
        }
    };

    // const handleDropdownVisibleTypeChange = (open) => {
    //     if (open && typeOptions.length === 0) {
    //         getNotifyTypes().then((types) => {
    //             if (!types) {
    //                 return;
    //             }

    //             setTypeOptions(types.data.notifyTypes);
    //         });
    //     }
    // };

    // React.useEffect(() => {
    //     if (!userSelectOpen) {
    //         return;
    //     }

    //     searchUsersRef.current = setTimeout(searchUsersHandler, 500);

    //     return () => {
    //         clearTimeout(searchUsersRef.current);
    //     };
    // }, [searchValue]);

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">Отправка уведомления</Text>
            </div>

            <div className={base.formMedium}>
                <Input
                    value={title}
                    setValue={setTitle}
                    title="Заголовок"
                    placeholder="Введите текст"
                    lengthLimit={100}
                    trackLength
                />

                <Checkbox checked={sendAnonim} onChange={(e) => setSendAnonim(e.target.checked)}>
                    Отправить от имени
                </Checkbox>

                {sendAnonim && (
                    <Input
                        value={author}
                        setValue={setAuthor}
                        placeholder="Имя / никнейм"
                        title="От кого отправить"
                        lengthLimit={30}
                        trackLength
                    />
                )}

                <Checkbox checked={sendForOne} onChange={(e) => setSendForOne(e.target.checked)}>
                    Отправить пользователю
                </Checkbox>

                {sendForOne && (
                    <Select
                        showSearch
                        placeholder="Пользователь"
                        mode="multiple"
                        maxTagCount="responsive"
                        // notContentText="Пользователей не найдено"
                        loading={false}
                        onSearch={(value: string) => setSearchValue(value.trim())}
                        onDropdownVisibleChange={handleDropdownVisibleUsersChange}
                        onChange={(value: number[]) => setUserIDs(value)}
                        filterOption={false}
                        // options={userOptions.map((data) => {
                        //     return {
                        //         label: data.nickname,
                        //         value: data.id,
                        //     };
                        // })}
                    />
                )}

                <Checkbox checked={delayedSend} onChange={(e) => setDelayedSend(e.target.checked)}>
                    Отложенная отправка
                </Checkbox>

                {delayedSend && (
                    <div className={styles.notifiesDelayInner}>
                        <DatePicker
                            disablePrevDate
                            placeholder="Выберите дату"
                            wrapperClass={styles.notifiesDelayItem}
                            value={date}
                            // @ts-ignore
                            setValue={setDate}
                        />
                        <TimePicker
                            placeholder="Выберите время"
                            format="HH:mm"
                            className={styles.notifiesDelayItem}
                            value={time}
                            onChange={(e) => setTime(e ?? undefined)}
                            suffixIcon={<Clock style={{ width: 18, color: 'var(--text)' }} />}
                        />
                    </div>
                )}

                {/* <Select
                    placeholder="Тип уведомления"
                    notContentText="Типов уведомления не найдено"
                    loading={notifyTypesIsLoading}
                    onDropdownVisibleChange={handleDropdownVisibleTypeChange}
                    onChange={(value) => setType(value)}
                    options={typeOptions.map((data) => {
                        return {
                            label: data.type,
                            value: data.id,
                        };
                    })}
                />*/}

                {/* <EditorNoSSR placeholder="Сообщение" ref={editorRef} id="notifyEditor" /> */}
            </div>

            <Button auto onClick={createNotify} levitation>
                Отправить
            </Button>
        </div>
    );
};

export default AdminNotifies;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
