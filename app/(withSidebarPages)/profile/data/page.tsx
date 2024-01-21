'use client';

import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import dayjs, { Dayjs } from 'dayjs';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Select } from '@/shared/ui/Select';
import { useAppSelector } from '@/shared/hooks/useRedux';
import useProfileData from '@/features/user/data/useProfileData';
import { Preloader } from '@/shared/ui/Preloader';
import useAvatar from '@/features/user/data/useAvatar';

const ProfileData = () => {
    const [name, setName] = React.useState<string>('');
    const [surname, setSurname] = React.useState<string>('');
    const [birthday, setBirthday] = React.useState<Dayjs | null>(null);
    const [sex, setSex] = React.useState<'Мужской' | 'Женский' | null>(null);
    const [img, setImg] = React.useState<File | null>(null);
    const [imgPreview, setImgPreview] = React.useState<string | ArrayBuffer | null>(null);

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

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) {
            return;
        }

        setImg(e.target.files[0]);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setImgPreview(fileReader.result);

            let formData = new FormData();

            if (e.target.files) {
                formData.append('avatar', e.target.files[0]);
            }

            updateAvatar(formData, () => {
                e.target.value = '';
            });
        };
    };

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
            <Text variant="h3">Личные данные</Text>

            <div className={styles.dataWrapper}>
                <div className={styles.dataAvatar}>
                    <div className={styles.dataAvatarOutline}>
                        <div className={styles.dataAvatarBackground}>
                            {avatar ? <Image src={avatar} alt="Аватар" fill /> : nickname ? nickname[0] : 'No'}
                        </div>
                    </div>

                    <Text variant="text2" className={styles.dataAvatarText}>
                        Максимальный размер файла - 2MB
                    </Text>

                    <div className={styles.dataAvatarActions}>
                        <input
                            id="avatar"
                            type="file"
                            className={styles.file}
                            accept={'image/png, image/jpeg, image/svg+xml'}
                            onChange={onInputChange}
                        />

                        {avatarLoading ? (
                            <Button loading small variant="light">
                                Загрузить
                            </Button>
                        ) : (
                            <label htmlFor="avatar" className={styles.avatarLoadButton}>
                                Загрузить
                            </label>
                        )}

                        {avatar && (
                            <Button
                                small
                                variant="light"
                                color="danger"
                                loading={avatarLoading}
                                onClick={() => deleteAvatar()}
                            >
                                Удалить
                            </Button>
                        )}
                    </div>
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

            <Button auto className={styles.dataButton} loading={dataIsSaving} onClick={saveData}>
                Сохранить
            </Button>
        </div>
    );
};

export default ProfileData;
