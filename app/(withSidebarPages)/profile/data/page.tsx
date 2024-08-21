'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dayjs, { Dayjs } from 'dayjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Select } from '@/shared/ui/Select';
import { useProfileData, useAvatar } from '@/features/user';
import { Preloader } from '@/shared/ui/Preloader';
import { Upload, Delete, Paintbruh } from '@/shared/icons';
import { File } from '@/shared/ui/File';
import { Badge } from '@/shared/ui/Badge';

type GenderType = 'Мужской' | 'Женский';

const genderValues: { label: string; value: GenderType }[] = [
    {
        label: 'Мужской',
        value: 'Мужской',
    },
    {
        label: 'Женский',
        value: 'Женский',
    },
];

const ProfileData = () => {
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [birthday, setBirthday] = React.useState<Dayjs | null>();
    const [sex, setSex] = React.useState<GenderType | null>(null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

    const { dataIsSaving, getProfileData, saveProfileData } = useProfileData();
    const { isLoading: avatarLoading, deleteAvatar, updateAvatar } = useAvatar();

    const { data, isLoading } = useQuery({
        queryKey: ['profile_data'],
        queryFn: () => getProfileData(),
    });

    const { avatar, nickname } = data || {};

    const queryClient = useQueryClient();

    const revalidateProfile = async () => {
        await queryClient.invalidateQueries({ queryKey: ['profile_data'] });
    };

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
            updateAvatar(formData, revalidateProfile);
        }
    }, [avatarFile]);

    React.useEffect(() => {
        if (data) {
            const { firstName, lastName, birthDate, gender } = data;

            setName(firstName || '');
            setSurname(lastName || '');
            setBirthday(birthDate ? dayjs(birthDate) : undefined);
            setSex(gender || null);
        }
    }, [data]);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.titleInner}>
                <Text variant="h3">Личные данные</Text>
            </div>

            <div className={styles.dataWrapper}>
                <div className={styles.dataAvatar}>
                    <div className={styles.dataAvatarOutline}>
                        <div className={styles.dataAvatarBackground}>
                            <Badge image={avatar} text={nickname ?? 'No'} style={{ width: '100%', height: '100%' }} />

                            {avatarLoading && <Preloader small />}
                        </div>
                    </div>

                    <Text variant="text2" className={styles.dataAvatarText}>
                        Максимальный размер файла - {process.env.NEXT_PUBLIC_MAX_SIZE} MB
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
                                    onClick={() => deleteAvatar(revalidateProfile)}
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
                                    onClick={() => deleteAvatar(revalidateProfile)}
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
                        <Select<GenderType>
                            title="Пол"
                            placeholder="Выберите пол"
                            value={sex}
                            setValue={setSex}
                            wrapperClass={styles.dataItem}
                            options={genderValues}
                        />
                    </div>
                </div>
            </div>

            <Button auto loading={dataIsSaving} onClick={saveData} levitation>
                Сохранить
            </Button>
        </div>
    );
};

export default ProfileData;
