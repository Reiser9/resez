<<<<<<< HEAD
'use client';

import React, { TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Blind, Eye, Info } from '@/shared/icons';
import { Text } from '../Text';
import { Tooltip } from 'antd';

interface InputsProps {
    value?: string;
    setValue?: (value: string) => void;
    placeholder?: string;
    title?: string;
    disabled?: boolean;
    trackLength?: boolean;
    lengthLimit?: number;
    wrapperClass?: string;
    isError?: boolean;
    isSuccess?: boolean;
    errorMessage?: string;
    infoText?: string;
    commentText?: string;
    color?: 'default' | 'white';
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> &
    InputsProps & {
        variant?: 'input';
        type?: 'text' | 'password' | 'number';
    };

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
    InputsProps & {
        variant?: 'textarea';
        type?: 'text';
    };

type Props = InputProps | TextareaProps;

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
    (
        {
            variant = 'input',
            type = 'text',
            value,
            setValue = () => {},
            placeholder,
            title,
            disabled = false,
            trackLength = false,
            isError = false,
            isSuccess = false,
            errorMessage,
            lengthLimit = 9999,
            infoText,
            commentText,
            color = 'default',
            wrapperClass,
            onChange,
            className,
            children,
            ...props
        }: Props,
        ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const [show, setShow] = React.useState<boolean>(false);

        const content = () => {
            if (variant === 'textarea') {
                return (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        placeholder={placeholder}
                        className={cn(styles.input, styles.textarea, styles[color], className, {
                            [styles.disabled]: disabled,
                            [styles.error]: isError,
                            [styles.success]: isSuccess,
                        })}
                        maxLength={lengthLimit}
                        value={value}
                        onChange={onChange ? onChange : (e) => setValue(e.target.value)}
                        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    ></textarea>
                );
            }

            return (
                <input
                    ref={ref as React.Ref<HTMLInputElement>}
                    className={cn(styles.input, styles[color], className, {
                        [styles.password]: type === 'password' || infoText,
                        [styles.disabled]: disabled,
                        [styles.error]: isError,
                        [styles.success]: isSuccess,
                    })}
                    maxLength={lengthLimit}
                    placeholder={placeholder}
                    type={show ? 'text' : type}
                    value={value}
                    onChange={onChange ? onChange : (e) => setValue(e.target.value)}
                    {...(props as InputHTMLAttributes<HTMLInputElement>)}
                />
            );
        };

        return (
            <div className={cn(styles.inputWrapper, wrapperClass)}>
                {(title || trackLength) && (
                    <div className={styles.inputTitleWrapper}>
                        {title && <Text variant="text3">{title}</Text>}
                        {trackLength && (
                            <p
                                className={cn(typography.text3, styles.limitText, {
                                    [styles.limit]: (value?.length || 0) >= lengthLimit,
                                })}
                            >
                                {value?.length || 0}
                                {lengthLimit ? ` / ${lengthLimit}` : ''}
                            </p>
                        )}
                    </div>
                )}

                <div className={styles.inputInner}>
                    {content()}

                    {type === 'password' && (
                        <div className={styles.inputShow} onClick={() => setShow((prev) => !prev)}>
                            {show ? <Blind /> : <Eye />}
                        </div>
                    )}

                    {type !== 'password' && infoText && (
                        <Tooltip title={infoText} placement="topRight">
                            <div className={styles.infoIcon}>
                                <Info />
                            </div>
                        </Tooltip>
                    )}

                    {children && children}
                </div>

                {isError && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                {commentText && <p className={styles.commentText}>{commentText}</p>}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
=======
'use client';

import React, { TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Blind, Eye, Info } from '@/shared/icons';
import { Text } from '../Text';
import { Tooltip } from 'antd';

interface InputsProps {
    value?: string;
    setValue?: (value: string) => void;
    placeholder?: string;
    title?: string;
    disabled?: boolean;
    trackLength?: boolean;
    lengthLimit?: number;
    wrapperClass?: string;
    isError?: boolean;
    isSuccess?: boolean;
    errorMessage?: string;
    infoText?: string;
    commentText?: string;
    color?: 'default' | 'white';
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

type InputProps = InputHTMLAttributes<HTMLInputElement> &
    InputsProps & {
        variant?: 'input';
        type?: 'text' | 'password' | 'number';
    };

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
    InputsProps & {
        variant?: 'textarea';
        type?: 'text';
    };

type Props = InputProps | TextareaProps;

const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
    (
        {
            variant = 'input',
            type = 'text',
            value,
            setValue = () => {},
            placeholder,
            title,
            disabled = false,
            trackLength = false,
            isError = false,
            isSuccess = false,
            errorMessage,
            lengthLimit = 9999,
            infoText,
            commentText,
            color = 'default',
            wrapperClass,
            onChange,
            className,
            children,
            ...props
        }: Props,
        ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const [show, setShow] = React.useState<boolean>(false);

        const content = () => {
            if (variant === 'textarea') {
                return (
                    <textarea
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        placeholder={placeholder}
                        className={cn(styles.input, styles.textarea, styles[color], className, {
                            [styles.disabled]: disabled,
                            [styles.error]: isError,
                            [styles.success]: isSuccess,
                        })}
                        maxLength={lengthLimit}
                        value={value}
                        onChange={onChange ? onChange : (e) => setValue(e.target.value)}
                        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    ></textarea>
                );
            }

            return (
                <input
                    ref={ref as React.Ref<HTMLInputElement>}
                    className={cn(styles.input, styles[color], className, {
                        [styles.password]: type === 'password' || infoText,
                        [styles.disabled]: disabled,
                        [styles.error]: isError,
                        [styles.success]: isSuccess,
                    })}
                    maxLength={lengthLimit}
                    placeholder={placeholder}
                    type={show ? 'text' : type}
                    value={value}
                    onChange={onChange ? onChange : (e) => setValue(e.target.value)}
                    {...(props as InputHTMLAttributes<HTMLInputElement>)}
                />
            );
        };

        return (
            <div className={cn(styles.inputWrapper, wrapperClass)}>
                {(title || trackLength) && (
                    <div className={styles.inputTitleWrapper}>
                        {title && <Text variant="text3">{title}</Text>}
                        {trackLength && (
                            <p
                                className={cn(typography.text3, styles.limitText, {
                                    [styles.limit]: (value?.length || 0) >= lengthLimit,
                                })}
                            >
                                {value?.length || 0}
                                {lengthLimit ? ` / ${lengthLimit}` : ''}
                            </p>
                        )}
                    </div>
                )}

                <div className={styles.inputInner}>
                    {content()}

                    {type === 'password' && (
                        <div className={styles.inputShow} onClick={() => setShow((prev) => !prev)}>
                            {show ? <Blind /> : <Eye />}
                        </div>
                    )}

                    {type !== 'password' && infoText && (
                        <Tooltip title={infoText} placement="topRight">
                            <div className={styles.infoIcon}>
                                <Info />
                            </div>
                        </Tooltip>
                    )}

                    {children && children}
                </div>

                {isError && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                {commentText && <p className={styles.commentText}>{commentText}</p>}
            </div>
        );
    },
);

Input.displayName = 'Input';

export default Input;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
