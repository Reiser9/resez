'use client';

import React from 'react';
import ReactDOM from 'react-dom';

import styles from './index.module.scss';

import { Modal } from '.';
import { Button } from '../Button';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    text?: string;
    confirmText?: string;
    rejectText?: string;
    loading?: boolean;
    callback?: () => void;
    rejectCallback?: () => void;
    children?: React.ReactNode;
};

const ConfirmModal: React.FC<Props> = ({
    value,
    setValue,
    text,
    confirmText = 'Да',
    rejectText = 'Нет',
    loading = false,
    callback = () => {},
    rejectCallback = () => {},
    children,
}) => {
    const callbackWithClose = () => {
        callback();
        setValue(false);
    };

    return ReactDOM.createPortal(
        <Modal title="Подтвердите действие" value={value} setValue={setValue} text={text} size="small">
            {children && children}

            <div className={styles.confirmModalButtons}>
                <Button
                    variant="light"
                    onClick={() => {
                        rejectCallback();
                        setValue(false);
                    }}
                >
                    {rejectText}
                </Button>

                {value ? (
                    <Button color="danger" variant="light" onClick={callbackWithClose} loading={loading}>
                        {confirmText}
                    </Button>
                ) : (
                    <Button color="danger" variant="light">
                        {confirmText}
                    </Button>
                )}
            </div>
        </Modal>,
        document.body,
    );
};

export default ConfirmModal;
