'use client';

import React from 'react';
import { Checkbox } from 'antd';
import { Dayjs } from 'dayjs';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import useAlert from '@/shared/hooks/useAlert';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Select } from '@/shared/ui/Select';
import { Button } from '@/shared/ui/Button';
import { isDateTimePast } from '@/shared/utils/isDateTimePast';
import { formatDate } from '@/shared/utils/formatDate';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Editor } from '@/shared/ui/Editor';

const AdminNotifies = () => {
    const [title, setTitle] = React.useState<string>('');
    const [author, setAuthor] = React.useState<string>('');
    const [date, setDate] = React.useState<Dayjs | undefined>();
    const [time, setTime] = React.useState<Dayjs | undefined>();

    const [searchValue, setSearchValue] = React.useState<string>('');
    const [userSelectOpen, setUserSelectOpen] = React.useState<boolean>(false);
    const [userOptions, setUserOptions] = React.useState<string[]>([]);
    const [userIDs, setUserIDs] = React.useState<number[]>([]);

    const [type, setType] = React.useState(null);
    const [typeOptions, setTypeOptions] = React.useState([]);

    const [sendAnonim, setSendAnonim] = React.useState(false);
    const [sendForOne, setSendForOne] = React.useState(false);
    const [delayedSend, setDelayedSend] = React.useState(false);

    // const { isLoading, searchUsersLoading, notifyTypesIsLoading, sendNotify, searchUsers, getNotifyTypes } = useAdmin();
    // const { alertNotify } = useAlert();

    // const searchUsersRef = React.useRef(null);
    const editorRef = React.useRef(null);

    // const createNotify = async () => {
    //     if ((!date || !time) && delayedSend) {
    //         return alertNotify('Ошибка', 'Укажите время и дату', 'error');
    //     }

    //     if (delayedSend && !isDateTimePast(date, time)) {
    //         return alertNotify('Ошибка', 'Нельзя отправить уведомление в прошедшую дату', 'error');
    //     }

    //     if (delayedSend) {
    //         var newDate = formatDate(
    //             `${date?.format('YYYY-MM-DD')}T${time?.format('HH:mm:ss')}`,
    //             'YYYY-MM-DDTHH:mm:ss.SSSZ',
    //         );
    //     }

    //     const savedData = await editorRef.current?.save();
    //     const content = getHtmlInEditor(savedData.blocks);

    //     sendNotify(title, author, userIDs, newDate, content, type, () => navigate('/'));
    // };

    // const searchUsersHandler = () => {
    //     setUserOptions([]);
    //     searchUsers(searchValue, true).then((users) => {
    //         if (!users) {
    //             return;
    //         }

    //         setUserOptions(users.users);
    //     });
    // };

    // const handleDropdownVisibleUsersChange = (open) => {
    //     setUserSelectOpen(open);

    //     if (open && userOptions.length === 0) {
    //         searchUsersHandler();
    //     }
    // };

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

                <Button auto variant="light">
                    Отправить
                </Button>
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

                {/* {sendForOne && (
                    <Select
                        showSearch
                        placeholder="Пользователь"
                        mode="multiple"
                        maxTagCount="responsive"
                        notContentText="Пользователей не найдено"
                        loading={searchUsersLoading}
                        onSearch={(value) => setSearchValue(value.trim())}
                        onDropdownVisibleChange={handleDropdownVisibleUsersChange}
                        onChange={(value) => setUserIDs(value)}
                        filterOption={false}
                        options={userOptions.map((data) => {
                            return {
                                label: data.nickname,
                                value: data.id,
                            };
                        })}
                    />
                )} */}

                <Checkbox checked={delayedSend} onChange={(e) => setDelayedSend(e.target.checked)}>
                    Отложенная отправка
                </Checkbox>

                {/* {delayedSend && (
                    <div className={styles.notifiesDelayInner}>
                        <DatePicker
                            disablePrevDate
                            placeholder="Выберите дату"
                            className={styles.notifiesDelayItem}
                            value={date}
                            onChange={(e) => setDate(e)}
                        />
                        <TimePicker
                            placeholder="Выберите время"
                            format="HH:mm"
                            className={styles.notifiesDelayItem}
                            value={time}
                            onChange={(e) => setTime(e)}
                        />
                    </div>
                )} */}

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

                {/* @ts-ignore */}
                <Editor placeholder="Сообщение" ref={editorRef} id="notifyEditor" />
            </div>
        </div>
    );
};

export default AdminNotifies;
