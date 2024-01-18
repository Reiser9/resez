import React from 'react';

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
};

const ConfirmModal: React.FC<Props> = ({
    value,
    setValue,
    text,
    confirmText = 'Да',
    rejectText = 'Нет',
    loading = false,
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
                    <Button color="danger" variant="light" onClick={callbackWithClose} loading={loading}>
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
