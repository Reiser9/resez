import React from 'react';

import styles from './index.module.css';

import { Modal } from '.';
import { Button } from '../Button';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    text?: string;
    confirmText?: string;
    rejectText?: string;
    callback?: () => void;
};

const ConfirmModal: React.FC<Props> = ({
    value,
    setValue,
    text,
    confirmText = 'Да',
    rejectText = 'Нет',
    callback = () => {},
}) => {
    const callbackWithClose = () => {
        callback();
        setValue(false);
    };

    return (
        <Modal title="Подтвердите действие" value={value} setValue={setValue} text={text} size="small">
            <div className={styles.confirmModalButtons}>
                {value ? (
                    <Button color="danger" variant="light" onClick={callbackWithClose}>
                        {confirmText}
                    </Button>
                ) : (
                    <Button color="danger" variant="light">
                        {confirmText}
                    </Button>
                )}
                <Button variant="light" onClick={() => setValue(false)}>
                    {rejectText}
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
