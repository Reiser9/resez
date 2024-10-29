'use client';

import React from 'react';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { usePromocode } from '@/features/promocode';
import { Clock, Dices } from '@/shared/icons';
import useAlert from '@/shared/hooks/useAlert';
import { formatDate } from '@/shared/utils/formatDate';
import { isDateTimePast } from '@/shared/utils/isDateTimePast';
import { generateRandomString } from '@/shared/utils/generateRandomString';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { DatePicker } from '@/shared/ui/DatePicker';
import { Text } from '@/shared/ui/Text';
import { TimePicker } from '@/shared/ui/TimePicker';
import { useMutation } from '@tanstack/react-query';

const AdminCreatePromo = () => {
    const [promocode, setPromocode] = React.useState('');
    const [date, setDate] = React.useState<Dayjs | null>();
    const [time, setTime] = React.useState<Dayjs>();
    const [limit, setLimit] = React.useState('');
    const [xp, setXp] = React.useState('');
    const [coins, setCoins] = React.useState('');

    const { alertNotify } = useAlert();
    const router = useRouter();

    const { createPromocode } = usePromocode();

    const createPromocodeHandler = async () => {
        if (!promocode) {
            return alertNotify('Предупреждение', 'Промокод не может быть пустым', 'warn');
        }

        if (promocode.length < 3 || promocode.length > 20) {
            return alertNotify('Предупреждение', 'Промокод должен быть больше 3-х и меньше 20 символов', 'warn');
        }

        if ((date && !time) || (!date && time)) {
            return alertNotify('Предупреждение', 'Укажите время и дату', 'warn');
        }

        if (date && time && !isDateTimePast(date, time)) {
            return alertNotify('Ошибка', 'Нельзя указать прошедшую дату', 'error');
        }

        if (date && time) {
            var expiredDate = formatDate(
                new Date(`${date?.format('YYYY-MM-DD')}T${time?.format('HH:mm:ss')}`),
                'YYYY-MM-DDTHH:mm:ss.SSSZ',
            );
        }

        await createPromocode(promocode, expiredDate ?? '', limit, xp, coins, () => router.push('/admin/promo'));
    };

    const createPromocodeMutation = useMutation({
        mutationFn: () => createPromocodeHandler(),
    });

    const generatePromo = () => {
        const randomString = generateRandomString(20);

        setPromocode(randomString);
    };

    return (
        <PrivateWrapper permissions={[PERMISSIONS.PROMOCODES]}>
            <CreatePageWrapper
                title="Создание промокода"
                button={
                    <Button
                        auto
                        loading={createPromocodeMutation.isPending}
                        levitation
                        onClick={() => createPromocodeMutation.mutate()}
                    >
                        Создать
                    </Button>
                }
            >
                <div className={base.formMedium}>
                    <Input title="Промокод" trackLength lengthLimit={20} value={promocode} setValue={setPromocode} />

                    <Button auto variant="light" onClick={generatePromo}>
                        <Dices />
                        Сгенерировать
                    </Button>

                    <div className={base.baseWrapperGap4}>
                        <Text variant="text3">Дата и время истечения промокода</Text>

                        <div className={styles.promoExpiredContent}>
                            <DatePicker
                                disablePrevDate
                                wrapperClass={styles.promoExpiredItem}
                                value={date}
                                setValue={setDate}
                            />

                            <TimePicker
                                format="HH:mm"
                                wrapperClass={styles.promoExpiredItem}
                                value={time}
                                setValue={setTime}
                                suffixIcon={<Clock style={{ width: 18, color: 'var(--text)' }} />}
                            />
                        </div>
                    </div>

                    <Input
                        title="Лимит активаций"
                        type="number"
                        value={limit}
                        setValue={setLimit}
                        infoText="Оставьте поле пустым, если хотите создать безлимитный промокод"
                    />

                    <Input title="Количество опыта" type="number" value={xp} setValue={setXp} />

                    <Input title="Количество ResCoins" type="number" value={coins} setValue={setCoins} />
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminCreatePromo;
