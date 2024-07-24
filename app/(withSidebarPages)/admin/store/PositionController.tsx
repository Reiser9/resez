'use client';

import React from 'react';

import styles from './index.module.scss';

import {
    ArrowBottomLeft,
    ArrowBottomLong,
    ArrowBottomRight,
    ArrowLeftLong,
    ArrowRightLong,
    ArrowTop,
    ArrowTopLeft,
    ArrowTopRight,
    Center,
    PositionHorizontal,
    PositionVertical,
} from '@/shared/icons';
import { IconButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

type Props = {
    maxWidth: number;
    maxHeight: number;
    width: number;
    height: number;
    position: { x: number; y: number };
    setPosition: React.Dispatch<
        React.SetStateAction<{
            x: number;
            y: number;
        }>
    >;
};

const PositionController: React.FC<Props> = ({ position, setPosition, maxWidth, maxHeight, width, height }) => {
    const setPositionProduct = (x: number, y: number) => {
        setPosition((prev) => {
            let newX = prev.x + x,
                newY = prev.y + y;

            if (prev.x + x > maxWidth) {
                newX = maxWidth;
            } else if (prev.x + x < 0) newX = 0;

            if (prev.y + y > maxHeight) {
                newY = maxHeight;
            } else if (prev.y + y < 0) {
                newY = 0;
            }

            return {
                x: newX,
                y: newY,
            };
        });
    };

    const centerPositionProduct = () => {
        setPosition({
            x: (maxWidth - width) / 2,
            y: (maxHeight - height) / 2,
        });
    };

    const positionCenterVertical = () => {
        setPosition((prev) => {
            return {
                x: prev.x,
                y: (maxHeight - height) / 2,
            };
        });
    };

    const positionCenterHorizontal = () => {
        setPosition((prev) => {
            return {
                x: (maxWidth - width) / 2,
                y: prev.y,
            };
        });
    };

    return (
        <div className={styles.positionController}>
            <div className={styles.positionValues}>
                <Input title="Ширина" value={String(width)} wrapperClass={styles.positionValue} disabled />
                <Input title="Высота" value={String(height)} wrapperClass={styles.positionValue} disabled />
                <Input title="Позиция X" value={String(position.x)} wrapperClass={styles.positionValue} disabled />
                <Input title="Позиция Y" value={String(position.y)} wrapperClass={styles.positionValue} disabled />
            </div>

            <div className={styles.positionActionsButtons}>
                <div className={styles.positionActions}>
                    <IconButton small onClick={() => setPositionProduct(-1, -1)}>
                        <ArrowTopLeft />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(0, -1)}>
                        <ArrowTop />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(1, -1)}>
                        <ArrowTopRight />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(-1, 0)}>
                        <ArrowLeftLong />
                    </IconButton>

                    <IconButton small onClick={centerPositionProduct}>
                        <Center />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(1, 0)}>
                        <ArrowRightLong />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(-1, 1)}>
                        <ArrowBottomLeft />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(0, 1)}>
                        <ArrowBottomLong />
                    </IconButton>

                    <IconButton small onClick={() => setPositionProduct(1, 1)}>
                        <ArrowBottomRight />
                    </IconButton>
                </div>

                <div className={styles.positionButtons}>
                    <IconButton small onClick={positionCenterHorizontal}>
                        <PositionHorizontal />
                    </IconButton>

                    <IconButton small onClick={positionCenterVertical}>
                        <PositionVertical />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default PositionController;
