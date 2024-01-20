'use client';

import React from 'react';
import Image from 'next/image';
import { Dayjs } from 'dayjs';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Select } from '@/shared/ui/Select';
import { useAppSelector } from '@/shared/hooks/useRedux';

const ProfileData = () => {
    const [name, setName] = React.useState<string>('');
    const [surname, setSurname] = React.useState<string>('');
    const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
    const [sex, setSex] = React.useState<boolean | null>(null);

    const { user } = useAppSelector((state) => state.user);

    return (
        <div className={base.baseWrapperGap16}>
            <Text variant="h3">Личные данные</Text>

            <div className={styles.dataWrapper}>
                <div className={styles.dataAvatar}>
                    <div className={styles.dataAvatarOutline}>
                        <div className={styles.dataAvatarBackground}>
                            {user?.avatar ? <Image src={user.avatar} alt="Аватар" fill /> : "R"}
                            <Image src="/img/banner.jpg" alt="Аватар" fill />
                        </div>
                    </div>

                    <Text variant="text2" className={styles.dataAvatarText}>
                        Максимальный размер файла - 2MB
                    </Text>

                    <div className={styles.dataAvatarActions}>
                        <Button small variant="light">
                            Загрузить
                        </Button>
                        <Button small variant="light" color="danger">
                            Удалить
                        </Button>
                    </div>
                </div>

                <div className={base.contentItems}>
                    <Input
                        value={name}
                        setValue={setName}
                        wrapperClass={styles.dataItem}
                        title="Имя"
                        lengthLimit={20}
                        trackLength
                    />
                    <Input
                        value={surname}
                        setValue={setSurname}
                        wrapperClass={styles.dataItem}
                        title="Фамилия"
                        lengthLimit={30}
                        trackLength
                    />
                    <DatePicker
                        title="Дата рождения"
                        value={birthday}
                        setValue={setBirthday}
                        wrapperClass={styles.dataItem}
                    />
                    <Select
                        title="Пол"
                        placeholder="Выберите пол"
                        value={sex}
                        setValue={setSex}
                        wrapperClass={styles.dataItem}
                        options={[
                            {
                                label: 'Мужской',
                                value: 'Мужской',
                            },
                            {
                                label: 'Женский',
                                value: 'Женский',
                            },
                        ]}
                    />
                </div>
            </div>

            <Button auto className={styles.dataButton}>
                Сохранить
            </Button>
        </div>
    );
};

export default ProfileData;
