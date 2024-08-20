'use client';

import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import styles from './index.module.scss';

import { Cross } from '@/shared/icons';

import { Text } from '../Text';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    title?: string;
    subtitle?: string;
    text?: string;
    size?: 'default' | 'small';
    onClose?: () => void;
    children: React.ReactNode;
};

const Modal: React.FC<Props> = ({
    value,
    setValue,
    title,
    subtitle,
    text,
    size = 'default',
    onClose = () => {},
    children,
}) => {
    const closeModal = () => {
        setValue(false);
        onClose();
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (value) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [value]);

    return ReactDOM.createPortal(
        <div
            className={cn(styles.modalOverlay, {
                [styles.active]: value,
            })}
            onClick={closeModal}
        >
            <div className={cn(styles.modalWrapper, styles[size])}>
                <div
                    className={cn(styles.modalContent, {
                        [styles.active]: value,
                    })}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.modalTitleInner}>
                        <div className={styles.modalTitleWrapper}>
                            {title && <Text variant="h3">{title}</Text>}

                            {subtitle && (
                                <Text variant="text2" className={styles.modalDate}>
                                    {subtitle}
                                </Text>
                            )}
                        </div>

                        <button className={styles.modalCrossButton} onClick={closeModal}>
                            <Cross />
                        </button>
                    </div>

                    {(text || children) && (
                        <div className={styles.modalText}>
                            {text && <Text>{text}</Text>}

                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
};

export default Modal;
