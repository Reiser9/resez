'use client';

import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { DraggableData, Rnd } from 'react-rnd';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Color } from 'antd/es/color-picker';

import base from '@/shared/styles/base.module.scss';
import styles from './index.module.scss';

import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { Delete, FileEmpty, Photo } from '@/shared/icons';
import { useAvatar, useTheme } from '@/features/store';
import PositionController from '../PositionController';
import useAlert from '@/shared/hooks/useAlert';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';
import { PERMISSIONS } from '@/shared/consts/PERMISSIONS';
import useShortInfo from '@/features/user/data/useShortInfo';

import { Button, IconButton } from '@/shared/ui/Button';
import { ColorPickerInput, Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { Text } from '@/shared/ui/Text';
import { File } from '@/shared/ui/File';
import { Badge } from '@/shared/ui/Badge';
import { CONFIG } from '@/shared/consts/CONFIG';

type ProductTypes = 'avatar_decoration' | 'banner' | 'theme' | 'chat_effect' | 'status' | 'sticker';
type ProductConditions = 'free' | 'event' | 'achievement' | 'buy' | 'subscription';
type ProductViews = 'static' | 'animation';

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
    //     label: 'Тема',
    //     value: 'Тема',
    // },
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

const productConditions: { label: string; value: ProductConditions }[] = [
    {
        label: 'Бесплатно',
        value: 'free',
    },
    // {
    //     label: 'Сезонно/Временно',
    //     value: 'event',
    // },
    // {
    //     label: 'За достижение',
    //     value: 'achievement',
    // },
    {
        label: 'За валюту',
        value: 'buy',
    },
    // {
    //     label: 'За подписку',
    //     value: 'subscription',
    // },
];

const minWidth = 40;
const minHeight = 40;
const maxWidth = 200;
const maxHeight = 200;

const AdminStoreCreate = () => {
    const [view, setView] = React.useState<ProductViews>('static');

    const [productImage, setProductImage] = React.useState<File | null>(null);
    const [productImagePreview, setProductImagePreview] = React.useState<string | ArrayBuffer | null>(null);

    const [name, setName] = React.useState('');
    const [type, setType] = React.useState<ProductTypes | null>(null);
    const [condition, setCondition] = React.useState<ProductConditions | null>(null);

    const [price, setPrice] = React.useState('');

    const [productAnimationFile, setProductAnimationFile] = React.useState<File | null>(null);
    const [animationData, setAnimationData] = React.useState<any | null>(null);
    const [animationError, setAnimationError] = React.useState<string | null>(null);

    const [draggable, setDraggable] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const [width, setWidth] = React.useState(minWidth);
    const [height, setHeight] = React.useState(minHeight);
    const [aspectRatio, setAspectRatio] = React.useState(1);
    const imageRef = React.useRef<HTMLImageElement>(null);

    // Темы
    const [textColor, setTextColor] = React.useState<string | Color>(CONFIG.BASE_COLOR);
    const [textColorFormatHex, setTextColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>('hex');

    const [backgroundColor, setBackgroundColor] = React.useState<string | Color>(CONFIG.BASE_COLOR_LIGHT);
    const [backgroundColorFormatHex, setBackgroundColorFormatHex] = React.useState<'hex' | 'rgb' | 'hsb' | undefined>(
        'hex',
    );

    const textHexString = React.useMemo(
        () => (typeof textColor === 'string' ? textColor : textColor.toHexString()),
        [textColor],
    );
    const backgroundHexString = React.useMemo(
        () => (typeof backgroundColor === 'string' ? backgroundColor : backgroundColor.toHexString()),
        [backgroundColor],
    );
    // /Темы

    const { createAvatar } = useAvatar();
    const { createTheme } = useTheme();
    const { alertNotify } = useAlert();
    const router = useRouter();

    const { getShortInfo } = useShortInfo();

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { avatar, nickname } = user?.user || {};

    const handleResize = (e: MouseEvent | TouchEvent, direction: any, ref: HTMLElement, delta: any, position: any) => {
        const newWidth = ref.offsetWidth;
        const newHeight = newWidth / aspectRatio;
        setWidth(newWidth);
        setHeight(newHeight);
        setPosition(position);
    };

    const handleDragStart = () => {
        setDraggable(true);
    };

    const handleDragStop = (
        e:
            | React.MouseEvent<HTMLElement | SVGElement, MouseEvent>
            | React.TouchEvent<HTMLElement | SVGElement>
            | MouseEvent
            | TouchEvent,
        d: DraggableData,
    ) => {
        setPosition({ x: d.x, y: d.y });
        setDraggable(false);
    };

    // Сделать разделение по функциям

    const createProductHandler = () => {
        if (!name) {
            return alertNotify('Предупреждение', 'Название товара должно быть заполнено', 'warn');
        }
        if (!type) {
            return alertNotify('Предупреждение', 'Тип товара должен быть заполнен', 'warn');
        }

        const formData = new FormData();

        formData.append('title', name);

        if (view === 'static' && productImage) {
            formData.append('content', productImage);
        } else if (view === 'animation' && productAnimationFile) {
            formData.append('content', productAnimationFile);
        }

        formData.append('contentType', view);

        if (condition === 'buy') {
            formData.append('price', price);
        }

        const options = {
            width,
            height,
            x: `${((position.x + width / 2) / maxWidth) * 100}%`,
            y: `${((position.y + height / 2) / maxHeight) * 100}%`,
        };

        formData.append('options', JSON.stringify(options));

        if (type === 'avatar_decoration') {
            createAvatar(formData, () => router.push('/admin/store/products/avatar'));
        } else if (type === 'theme') {
            createTheme(name, textHexString, backgroundHexString, price, () =>
                router.push('/admin/store/products/theme'),
            );
        }
    };

    React.useEffect(() => {
        if (position.x < 0) {
            setPosition((prev) => {
                return {
                    x: 0,
                    y: prev.y,
                };
            });
        }

        if (position.y < 0) {
            setPosition((prev) => {
                return {
                    x: prev.x,
                    y: 0,
                };
            });
        }

        if (position.x + width > maxWidth) {
            setPosition((prev) => {
                return {
                    x: maxWidth - width,
                    y: prev.y,
                };
            });
        }

        if (position.y + height > maxHeight) {
            setPosition((prev) => {
                return {
                    x: prev.x,
                    y: maxHeight - height,
                };
            });
        }
    }, [draggable]);

    React.useEffect(() => {
        setPosition({
            x: 0,
            y: 0,
        });
    }, [productImagePreview]);

    React.useEffect(() => {
        if (productAnimationFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    try {
                        const json = JSON.parse(e.target.result as string);
                        setAnimationData(json);
                        setAnimationError(null);
                    } catch (error) {
                        setAnimationError('Некорректный JSON файл. Пожалуйста, загрузите правильный JSON файл.');
                        setAnimationData(null);
                        setProductAnimationFile(null);
                    }
                }
            };
            reader.readAsText(productAnimationFile);
        }
    }, [productAnimationFile]);

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

                    <Select<ProductConditions>
                        title="Условие получения"
                        placeholder="Выберите условие"
                        value={condition}
                        setValue={setCondition}
                        options={productConditions}
                    />

                    {condition === 'buy' && (
                        <Input value={price} setValue={setPrice} type="number" title="Цена товара" />
                    )}

                    {condition === 'free' && (
                        <Text variant="text2" fontWeight={500} center className={styles.createProductInfo}>
                            Пользователь может получить товар бесплатно
                        </Text>
                    )}

                    {condition === 'event' && (
                        <Text variant="text2" fontWeight={500} center className={styles.createProductInfo}>
                            Пользователь может получить товар в определенное время: --:--
                        </Text>
                    )}

                    {condition === 'achievement' && (
                        <Text variant="text2" fontWeight={500} center className={styles.createProductInfo}>
                            Пользователь может получить товар, выполнив достижение: название достижения
                        </Text>
                    )}

                    {condition === 'buy' && (
                        <Text variant="text2" fontWeight={500} center className={styles.createProductInfo}>
                            Пользователь может получить товар за валюту: {price || 0} ResCoin
                        </Text>
                    )}

                    {condition === 'subscription' && (
                        <Text variant="text2" fontWeight={500} center className={styles.createProductInfo}>
                            Пользователь может получить товар за подписку: название подписки
                        </Text>
                    )}

                    {condition && type && (
                        <>
                            {type === 'avatar_decoration' && (
                                <>
                                    <div className={styles.createProductTabs}>
                                        <button
                                            className={cn(styles.createProductTab, {
                                                [styles.active]: view === 'static',
                                            })}
                                            onClick={() => setView('static')}
                                        >
                                            Статика
                                        </button>

                                        <button
                                            className={cn(styles.createProductTab, {
                                                [styles.active]: view === 'animation',
                                            })}
                                            onClick={() => setView('animation')}
                                        >
                                            Анимация
                                        </button>
                                    </div>

                                    {view === 'static' && (
                                        <>
                                            <File
                                                id="productImage"
                                                setImgPreview={setProductImagePreview}
                                                setFile={setProductImage}
                                                accept="image/png, image/jpeg, image/svg+xml, image/gif"
                                            />

                                            <label
                                                htmlFor="productImage"
                                                className={cn(styles.createProductImage, {
                                                    [styles.imageFill]: productImage,
                                                })}
                                            >
                                                {productImagePreview ? (
                                                    <Image src={productImagePreview.toString()} alt="image" fill />
                                                ) : (
                                                    <Photo />
                                                )}

                                                {productImagePreview && (
                                                    <IconButton
                                                        small
                                                        circle
                                                        variant="danger"
                                                        className={styles.createProductImageDelete}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setProductImagePreview(null);
                                                            setProductImage(null);
                                                        }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </label>

                                            {productImagePreview && (
                                                <>
                                                    <Text variant="text2" fontWeight={500} center>
                                                        Выберите позицию товара
                                                    </Text>

                                                    <div className={styles.createProductPosition}>
                                                        <Badge
                                                            image={avatar}
                                                            text={nickname}
                                                            style={{ width: 92, height: 92 }}
                                                            className={styles.createProductCurrentAvatar}
                                                        />

                                                        <Rnd
                                                            bounds="parent"
                                                            size={{ width, height }}
                                                            position={position}
                                                            onResize={handleResize}
                                                            onDragStop={handleDragStop}
                                                            onDragStart={handleDragStart}
                                                            lockAspectRatio={aspectRatio}
                                                            minWidth={minWidth}
                                                            minHeight={minHeight / aspectRatio}
                                                            maxWidth={maxWidth}
                                                            maxHeight={maxHeight / aspectRatio}
                                                            enableResizing={{
                                                                bottomRight: true,
                                                                bottomLeft: true,
                                                                topRight: true,
                                                                topLeft: true,
                                                            }}
                                                        >
                                                            <div
                                                                className={cn(styles.createProductPositionImage, {
                                                                    [styles.opacity]: draggable,
                                                                })}
                                                            >
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img
                                                                    src={productImagePreview.toString()}
                                                                    alt="image"
                                                                    ref={imageRef}
                                                                    onLoad={() => {
                                                                        if (imageRef.current) {
                                                                            const img = imageRef.current;
                                                                            const aspectRatio =
                                                                                img.naturalWidth / img.naturalHeight;
                                                                            setAspectRatio(aspectRatio);

                                                                            if (img.naturalHeight > maxHeight) {
                                                                                setHeight(maxHeight);
                                                                                setWidth(maxHeight / aspectRatio);
                                                                            } else if (img.naturalWidth > maxWidth) {
                                                                                setWidth(maxWidth);
                                                                                setHeight(maxWidth / aspectRatio);
                                                                            } else {
                                                                                setWidth(img.naturalWidth);
                                                                                setHeight(
                                                                                    img.naturalWidth / aspectRatio,
                                                                                );
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </Rnd>
                                                    </div>

                                                    <PositionController
                                                        position={position}
                                                        setPosition={setPosition}
                                                        maxWidth={maxWidth}
                                                        maxHeight={maxHeight}
                                                        width={width}
                                                        height={height}
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}

                                    {view === 'animation' && (
                                        <>
                                            <File
                                                id="productAnimation"
                                                setFile={setProductAnimationFile}
                                                accept=".json"
                                            />

                                            <label htmlFor="productAnimation" className={styles.createProductAnimation}>
                                                <FileEmpty />
                                                {productAnimationFile ? productAnimationFile.name : 'Выберите файл'}

                                                {productAnimationFile && (
                                                    <IconButton
                                                        small
                                                        circle
                                                        variant="danger"
                                                        className={styles.createProductImageDelete}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setProductAnimationFile(null);
                                                            setAnimationData(null);
                                                        }}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                )}
                                            </label>

                                            {animationError && (
                                                <Text
                                                    variant="text2"
                                                    fontWeight={600}
                                                    style={{ color: 'var(--error)' }}
                                                >
                                                    {animationError}
                                                </Text>
                                            )}

                                            {animationData && (
                                                <>
                                                    <Text variant="text2" fontWeight={500} center>
                                                        Выберите позицию товара
                                                    </Text>

                                                    <div className={styles.createProductPosition}>
                                                        <Badge
                                                            image={avatar}
                                                            text={nickname}
                                                            style={{ width: 92, height: 92 }}
                                                            className={styles.createProductCurrentAvatar}
                                                        />

                                                        <Rnd
                                                            bounds="parent"
                                                            size={{ width, height }}
                                                            position={position}
                                                            onResize={handleResize}
                                                            onDragStop={handleDragStop}
                                                            onDragStart={handleDragStart}
                                                            lockAspectRatio={aspectRatio}
                                                            minWidth={minWidth}
                                                            minHeight={minHeight / aspectRatio}
                                                            maxWidth={maxWidth}
                                                            maxHeight={maxHeight / aspectRatio}
                                                            enableResizing={{
                                                                bottomRight: true,
                                                                bottomLeft: true,
                                                                topRight: true,
                                                                topLeft: true,
                                                            }}
                                                        >
                                                            <div
                                                                className={cn(styles.createProductPositionImage, {
                                                                    [styles.opacity]: draggable,
                                                                })}
                                                            >
                                                                <Lottie
                                                                    animationData={animationData}
                                                                    className={styles.createProductAnimationPreview}
                                                                    ref={imageRef}
                                                                />
                                                            </div>
                                                        </Rnd>
                                                    </div>

                                                    <PositionController
                                                        position={position}
                                                        setPosition={setPosition}
                                                        maxWidth={maxWidth}
                                                        maxHeight={maxHeight}
                                                        width={width}
                                                        height={height}
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                            {type === 'theme' && (
                                <>
                                    <ColorPickerInput
                                        title="Основной цвет"
                                        hexString={textHexString}
                                        value={textColor}
                                        format={textColorFormatHex}
                                        onFormatChange={setTextColorFormatHex}
                                        onChangeComplete={(color) => setTextColor(color)}
                                    />

                                    <ColorPickerInput
                                        title="Фоновый цвет"
                                        hexString={backgroundHexString}
                                        value={backgroundColor}
                                        format={backgroundColorFormatHex}
                                        onFormatChange={setBackgroundColorFormatHex}
                                        onChangeComplete={(color) => setBackgroundColor(color)}
                                    />

                                    <div className={styles.themePreviewBlock}></div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </CreatePageWrapper>
        </PrivateWrapper>
    );
};

export default AdminStoreCreate;
