'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs, { Dayjs } from 'dayjs';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Select } from '@/shared/ui/Select';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { useProfileData, useAvatar } from '@/features/user';
import { Preloader } from '@/shared/ui/Preloader';
import { Upload, Delete, Paintbruh } from '@/shared/icons';
import { File } from '@/shared/ui/File';

const ProfileData = () => {
    const [name, setName] = React.useState<string>('');
    const [surname, setSurname] = React.useState<string>('');
    const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
    const [sex, setSex] = React.useState<'Мужской' | 'Женский' | null>(null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

    const { isLoading, dataIsSaving, getProfileData, saveProfileData } = useProfileData();
    const { isLoading: avatarLoading, deleteAvatar, updateAvatar } = useAvatar();
    const user = useAppSelector((state) => state.user.user);
    const profileInfo = useAppSelector((state) => state.user.profileInfo);
    const { avatar, nickname } = user || {};

    const saveData = () => {
        saveProfileData({
            firstName: name,
            lastName: surname,
            birthDate: birthday,
            gender: sex,
        });
    };

    React.useEffect(() => {
        if (avatarFile) {
            let formData = new FormData();
            formData.append('avatar', avatarFile);
            updateAvatar(formData);
        }
    }, [avatarFile]);

    React.useEffect(() => {
        if (profileInfo) {
            const { firstName, lastName, birthDate, gender } = profileInfo;

            setName(firstName || '');
            setSurname(lastName || '');
            setBirthday(birthDate ? dayjs(birthDate) : null);
            setSex(gender || null);
        }
    }, [profileInfo]);

    React.useEffect(() => {
        getProfileData();
    }, []);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">Личные данные</Text>

                <Button auto variant="light" loading={dataIsSaving} onClick={saveData}>
                    Сохранить
                </Button>
            </div>

            <div className={styles.dataWrapper}>
                <div className={styles.dataAvatar}>
                    <div className={styles.dataAvatarOutline}>
                        <div className={styles.dataAvatarBackground}>
                            {avatar ? (
                                <Image src={avatar} alt="Аватар" fill className={styles.dataAvatarImg} />
                            ) : nickname ? (
                                nickname[0]
                            ) : (
                                'No'
                            )}

                            {avatarLoading && <Preloader small />}
                        </div>
                    </div>

                    <Text variant="text2" className={styles.dataAvatarText}>
                        Максимальный размер файла - 2MB
                    </Text>

                    <div className={styles.dataAvatarActions}>
                        <File id="avatar" setFile={setAvatarFile} />

                        {avatarLoading ? (
                            <>
                                <Button loading small variant="light" className={styles.dataAvatarActionDesktop}>
                                    Загрузить
                                </Button>

                                <IconButton disabled small circle className={styles.dataAvatarAction}>
                                    <Upload />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <label htmlFor="avatar" className={styles.avatarLoadButton}>
                                    <span>Загрузить</span>

                                    <Upload />
                                </label>
                            </>
                        )}

                        {avatar && (
                            <>
                                <Button
                                    small
                                    variant="light"
                                    color="danger"
                                    loading={avatarLoading}
                                    onClick={() => deleteAvatar()}
                                    className={styles.dataAvatarActionDesktop}
                                >
                                    Удалить
                                </Button>

                                <IconButton
                                    disabled={avatarLoading}
                                    small
                                    circle
                                    variant="danger"
                                    className={styles.dataAvatarAction}
                                    onClick={() => deleteAvatar()}
                                >
                                    <Delete />
                                </IconButton>
                            </>
                        )}
                    </div>
                </div>

                <div className={base.baseWrapperGap12}>
                    <div className={styles.dataBanner}>
                        <Image src="/img/banner.jpg" alt="Аватар" fill className={styles.dataBannerImg} />

                        <Link href="/personalization" className={styles.dataPersonalizationButton}>
                            <Paintbruh />
                            Персонализация
                        </Link>
                    </div>

                    <div className={base.contentItems}>
                        <Input
                            value={name}
                            setValue={setName}
                            wrapperClass={styles.dataItem}
                            title="Имя"
                            placeholder="Введите имя"
                            lengthLimit={20}
                            trackLength
                        />
                        <Input
                            value={surname}
                            setValue={setSurname}
                            wrapperClass={styles.dataItem}
                            title="Фамилия"
                            placeholder="Введите фамилию"
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
            </div>
        </div>
    );
};

export default ProfileData;
