'use client';

import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/navigation';

import styles from './index.module.scss';

import { ArrowLeft } from '@/shared/icons';

type Props = {
    disabled?: boolean;
    confirmExit?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton: React.FC<Props> = ({ disabled = false, confirmExit = false, ...props }) => {
    const router = useRouter();

    const back = () => {
        var exit = true;

        if(confirmExit){
            exit = confirm("Вы действительно хотите выйти со страницы? Заполненные данные не сохранятся");
        }

        if(exit){
            router.back();
        }
    };

    return (
        <button
            className={cn(styles.back, {
                [styles.disabled]: disabled,
            })}
            onClick={back}
            {...props}
        >
            <ArrowLeft />
        </button>
    );
};

export default BackButton;
