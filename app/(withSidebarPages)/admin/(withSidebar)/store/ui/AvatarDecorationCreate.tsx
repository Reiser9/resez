import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Lottie from 'lottie-react';
import { DraggableData, Rnd } from 'react-rnd';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import type { ProductViews } from '../create/page';
import PositionController from '../PositionController';
import { Delete, FileEmpty, Photo } from '@/shared/icons';
import { useShortInfo } from '@/features/user';

import { IMAGE_MAX_HEIGHT, IMAGE_MAX_WIDTH, IMAGE_MIN_HEIGHT, IMAGE_MIN_WIDTH } from '@/shared/consts/STORE_VARS';
import { IconButton } from '@/shared/ui/Button';
import { File } from '@/shared/ui/File';
import { Badge } from '@/shared/ui/Badge';
import { Text } from '@/shared/ui/Text';

type Props = {
    view: ProductViews;
    setView: (value: ProductViews) => void;
    width: number;
    setWidth: (value: number) => void;
    height: number;
    setHeight: (value: number) => void;
    position: { x: number; y: number };
    setPosition: React.Dispatch<
        React.SetStateAction<{
            x: number;
            y: number;
        }>
    >;
    productAnimationFile: File | null;
    setProductAnimationFile: (value: File | null) => void;
    productImage: File | null;
    setProductImage: (value: File | null) => void;
};

const AvatarDecorationCreate: React.FC<Props> = ({
    view,
    setView,
    width,
    setWidth,
    height,
    setHeight,
    position,
    setPosition,
    productAnimationFile,
    setProductAnimationFile,
    productImage,
    setProductImage,
}) => {
    const [draggable, setDraggable] = React.useState(false);

    // Static
    const [productImagePreview, setProductImagePreview] = React.useState<string | ArrayBuffer | null>(null);
    const [aspectRatio, setAspectRatio] = React.useState(1);

    // Animation
    const [animationData, setAnimationData] = React.useState<any | null>(null);
    const [animationError, setAnimationError] = React.useState<string | null>(null);

    const { getShortInfo } = useShortInfo();

    const { data: user } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { avatar, nickname } = user?.user || {};

    const calcAspectRatio = (width: number, height: number) => {
        const aspectRatio = width / height;

        if (aspectRatio >= 1) {
            setWidth(IMAGE_MAX_WIDTH);
            setHeight(IMAGE_MAX_WIDTH / aspectRatio);
        } else {
            setHeight(IMAGE_MAX_HEIGHT);
            setWidth(IMAGE_MAX_HEIGHT * aspectRatio);
        }

        setAspectRatio(aspectRatio);
    };

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

        if (position.x + width > IMAGE_MAX_WIDTH) {
            setPosition((prev) => {
                return {
                    x: IMAGE_MAX_WIDTH - width,
                    y: prev.y,
                };
            });
        }

        if (position.y + height > IMAGE_MAX_HEIGHT) {
            setPosition((prev) => {
                return {
                    x: prev.x,
                    y: IMAGE_MAX_HEIGHT - height,
                };
            });
        }
    }, [position]);

    React.useEffect(() => {
        setPosition({
            x: 0,
            y: 0,
        });
    }, [productImagePreview, animationData]);

    React.useEffect(() => {
        if (productAnimationFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    try {
                        const json = JSON.parse(e.target.result as string);

                        const { w, h, fr, ip, op } = json || {};

                        if (fr === undefined || ip === undefined || op === undefined) throw Error();

                        setAnimationData(json);
                        setAnimationError(null);
                        calcAspectRatio(w, h);
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
                        onImageLoad={calcAspectRatio}
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
                                    minWidth={IMAGE_MIN_WIDTH}
                                    minHeight={IMAGE_MIN_HEIGHT / aspectRatio}
                                    maxWidth={IMAGE_MAX_WIDTH}
                                    maxHeight={IMAGE_MAX_HEIGHT / aspectRatio}
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
                                        <Image
                                            width={width}
                                            height={height}
                                            src={productImagePreview.toString()}
                                            alt="image"
                                        />
                                    </div>
                                </Rnd>
                            </div>

                            <PositionController
                                position={position}
                                setPosition={setPosition}
                                maxWidth={IMAGE_MAX_WIDTH}
                                maxHeight={IMAGE_MAX_HEIGHT}
                                width={width}
                                height={height}
                            />
                        </>
                    )}
                </>
            )}

            {view === 'animation' && (
                <>
                    <File id="productAnimation" setFile={setProductAnimationFile} accept=".json" />

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
                        <Text variant="text2" fontWeight={600} style={{ color: 'var(--error)' }}>
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
                                    minWidth={IMAGE_MIN_WIDTH}
                                    minHeight={IMAGE_MIN_HEIGHT / aspectRatio}
                                    maxWidth={IMAGE_MAX_WIDTH}
                                    maxHeight={IMAGE_MAX_HEIGHT / aspectRatio}
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
                                        />
                                    </div>
                                </Rnd>
                            </div>

                            <PositionController
                                position={position}
                                setPosition={setPosition}
                                maxWidth={IMAGE_MAX_WIDTH}
                                maxHeight={IMAGE_MAX_HEIGHT}
                                width={width}
                                height={height}
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default AvatarDecorationCreate;
