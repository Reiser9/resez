'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Color } from 'antd/es/color-picker';
import { useQuery } from '@tanstack/react-query';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { IMAGE_MAX_HEIGHT, IMAGE_MAX_WIDTH, IMAGE_MIN_HEIGHT, IMAGE_MIN_WIDTH } from '@/shared/consts/STORE_VARS';
import { CONFIG } from '@/shared/consts/CONFIG';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { useAvatar, useTheme } from '@/features/store';
import { useSubscription } from '@/features/subscription';
import useAlert from '@/shared/hooks/useAlert';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import ThemeCreate from '../ui/ThemeCreate';
import AvatarDecorationCreate from '../ui/AvatarDecorationCreate';
import { useAchievement } from '@/features/user';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { DatePicker } from '@/shared/ui/DatePicker';
import { AchievementOption } from '@/shared/ui/OptionComponents';

type ProductTypes = 'avatar_decoration' | 'banner' | 'theme' | 'chat_effect' | 'status' | 'sticker';
export type ProductViews = 'static' | 'animation';

const productTypes: { label: string; value: ProductTypes }[] = [
    {
        label: 'Украшение аватарки',
        value: 'avatar_decoration',
    },
    {
        label: 'Тема',
        value: 'theme',
    },
    // {
    //     label: 'Эффект чата',
    //     value: 'Эффект чата',
    // },
    // {
    //     label: 'Статус',
    //     value: 'Статус',
    // },
    // {
    //     label: 'Наклейка',
    //     value: 'Наклейка',
    // },
];

const AdminStoreCreate = () => {
    const [name, setName] = React.useState('');
    const [type, setType] = React.useState<ProductTypes | null>(null);
    const [price, setPrice] = React.useState('');
    const [subscriptionId, setSubscriptionId] = React.useState<number | null>(null);
    const [startSeasonDate, setStartSeasonDate] = React.useState<Dayjs | null>(null);
    const [endSeasonDate, setEndSeasonDate] = React.useState<Dayjs | null>(null);
    const [achievementId, setAchievementId] = React.useState<number | null>(null);

    // Avatar Decoration
    const [view, setView] = React.useState<ProductViews>('static');
    const [productImage, setProductImage] = React.useState<File | null>(null);
    const [productAnimationFile, setProductAnimationFile] = React.useState<File | null>(null);

    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const [width, setWidth] = React.useState(IMAGE_MIN_WIDTH);
    const [height, setHeight] = React.useState(IMAGE_MIN_HEIGHT);

    // Theme
    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);

    const textHexString = React.useMemo(
        () => (typeof textColor === 'string' ? textColor : textColor.toHexString()),
        [textColor],
    );
    const backgroundHexString = React.useMemo(
        () => (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHexString()),
        [backgroundColor],
    );

    const { createAvatar } = useAvatar();
    const { createTheme } = useTheme();
    const { alertNotify } = useAlert();
    const { getSubscriptions } = useSubscription();
    const { getAchievements } = useAchievement();

    const router = useRouter();

    const {
        data: subscriptionsData,
        isLoading: subscriptionsIsLoading,
        isError: subscriptionsIsError,
    } = useQuery({
        queryKey: ['subscriptions'],
        queryFn: () => getSubscriptions(),
    });

    const {
        data: achievementsData,
        isLoading: achievementsIsLoading,
        isError: achievementsIsError,
    } = useQuery({
        queryKey: ['admin_achievements'],
        queryFn: () => getAchievements(),
    });

    const isValidFields = () => {
        if (!name) {
            alertNotify('Предупреждение', 'Название товара должно быть заполнено', 'warn');
            return false;
        }
        if (!type) {
            alertNotify('Предупреждение', 'Тип товара должен быть заполнен', 'warn');
            return false;
        }

        return true;
    };

    const createAvatarDecoration = () => {
        // if (!isValidFields()) return;

        const formData = new FormData();

        formData.append('title', name);

        if (view === 'static') {
            if (!productImage)
                return alertNotify('Предупреждение', 'Изображение украшения аватара должно быть выбрано', 'warn');

            formData.append('content', productImage);
        } else if (view === 'animation') {
            if (!productAnimationFile)
                return alertNotify('Предупреждение', 'Анимация украшения аватара должна быть выбрана', 'warn');

            formData.append('content', productAnimationFile);
        }

        formData.append('contentType', view);
        price && formData.append('price', price);
        subscriptionId && formData.append('requiredSubscriptionId', String(subscriptionId));
        achievementId && formData.append('requiredAchievementId', String(achievementId));
        startSeasonDate && formData.append('seasonStartDate', startSeasonDate.toISOString());
        endSeasonDate && formData.append('seasonEndDate', endSeasonDate.toISOString());

        const options = {
            width,
            height,
            x: `${((position.x + width / 2) / IMAGE_MAX_WIDTH) * 100}%`,
            y: `${((position.y + height / 2) / IMAGE_MAX_HEIGHT) * 100}%`,
        };

        formData.append('options', JSON.stringify(options));

        createAvatar(formData, () => router.push('/admin/store/products/avatar'));
    };

    const createProductHandler = () => {
        if (!isValidFields()) return;

        if (type === 'avatar_decoration') {
            createAvatarDecoration();
        } else if (type === 'theme') {
            createTheme(
                name,
                textHexString,
                backgroundHexString,
                price,
                subscriptionId,
                achievementId,
                startSeasonDate,
                endSeasonDate,
                () => router.push('/admin/store/products/theme'),
            );
        }
    };

    return (
        <PrivateWrapper permissions={[PERMISSIONS.CREATE_PRODUCTS]}>
            <CreatePageWrapper
                title="Создание товара"
                button={
                    <Button auto levitation onClick={createProductHandler}>
                        Создать
                    </Button>
                }
            >
                <div className={base.formMedium}>
                    <Input
                        value={name}
                        setValue={setName}
                        title="Название товара"
                        placeholder="Кошечка, бантик, корзинка..."
                        trackLength
                        lengthLimit={50}
                    />

                    <Select<ProductTypes>
                        title="Тип товара"
                        placeholder="Выберите тип товара"
                        value={type}
                        setValue={setType}
                        options={productTypes}
                    />

                    <Input
                        value={price}
                        setValue={setPrice}
                        type="number"
                        title="Цена товара"
                        infoText="Оставьте поле пустым, чтобы товар был бесплатным"
                    />

                    <DatePicker title="Дата начала сезона" value={startSeasonDate} setValue={setStartSeasonDate} />

                    <DatePicker title="Дата окончания сезона" value={endSeasonDate} setValue={setEndSeasonDate} />

                    <Select
                        title="Выберите достижение"
                        value={achievementId}
                        loading={achievementsIsLoading}
                        options={achievementsData?.map((data, index) => ({
                            label: data.type,
                            value: index,
                            options: data.elements.map((el) => ({
                                value: el.id,
                                label: el.achievement,
                                desc: el.description,
                                icon: el.icon,
                            })),
                        }))}
                        optionRender={(data) => {
                            const { desc, icon, label } = data?.data || {};

                            return <AchievementOption desc={desc} icon={icon} label={label} />;
                        }}
                        onChange={(value) => {
                            setAchievementId(value);
                        }}
                    />

                    <Select
                        title="Выберите подписку"
                        value={subscriptionId}
                        options={subscriptionsData?.map((data) => ({
                            label: data.subscription,
                            value: data.id,
                        }))}
                        onChange={(value) => {
                            setSubscriptionId(value);
                        }}
                    />

                    {type && (
                        <>
                            {type === 'avatar_decoration' && (
                                <AvatarDecorationCreate
                                    view={view}
                                    setView={setView}
                                    width={width}
                                    setWidth={setWidth}
                                    height={height}
                                    setHeight={setHeight}
                                    position={position}
                                    setPosition={setPosition}
                                    productAnimationFile={productAnimationFile}
                                    setProductAnimationFile={setProductAnimationFile}
                                    productImage={productImage}
                                    setProductImage={setProductImage}
                                />
                            )}

                            {type === 'theme' && (
                                <ThemeCreate
                                    textHexString={textHexString}
                                    backgroundHexString={backgroundHexString}
                                    textColor={textColor}
                                    backgroundColor={backgroundColor}
                                    setTextColor={setTextColor}
                                    setBackgroundColor={setBackgroundColor}
                                />
                            )}
                        </>
                    )}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminStoreCreate;
