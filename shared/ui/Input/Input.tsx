'use client';

import React, { TextareaHTMLAttributes, InputHTMLAttributes, WheelEvent } from 'react';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import cn from 'classnames';
import { Tooltip } from 'antd';

import styles from './index.module.scss';
import typography from '@/shared/styles/typography.module.scss';

import { Blind, Eye, Info } from '@/shared/icons';

import { Text } from '../Text';

interface InputsProps {
    value?: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
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
    resizable?: boolean;
    color?: 'default' | 'white';
    onInputChange?: (value: string) => void;
    resizeChange?: (value: string) => void;
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

const sanitizeConf = {
    allowedTags: ['div', 'br', 'p'],
};

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
            lengthLimit = 99999,
            infoText,
            commentText,
            color = 'default',
            wrapperClass,
            onInputChange,
            resizeChange,
            resizable = false,
            className,
            children,
            ...props
        }: Props,
        ref: React.ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const [show, setShow] = React.useState(false);
        const [textLength, setTextLength] = React.useState(0);

        const handleWheel = (event: WheelEvent<HTMLInputElement>) => {
            event.currentTarget.blur();
        };

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
                        onChange={
                            onInputChange ? (e) => onInputChange(e.target.value) : (e) => setValue(e.target.value)
                        }
                        {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    ></textarea>
                );
            }

            if (resizable) {
                return (
                    <ContentEditable
                        className={cn(styles.inputResizable, styles[color], className, {
                            [styles.password]: type === 'password' || infoText,
                            [styles.disabled]: disabled,
                            [styles.error]: isError,
                            [styles.success]: isSuccess,
                        })}
                        html={`${value}`}
                        tagName="div"
                        disabled={disabled}
                        onChange={(e) => {
                            const sanitizeValue = sanitizeHtml(e.target.value, sanitizeConf);

                            resizeChange ? resizeChange(sanitizeValue) : setValue(sanitizeValue);
                        }}
                    />
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
                    onWheel={handleWheel}
                    onChange={(e) => {
                        let value = e.target.value;

                        if (value.length > lengthLimit) {
                            return;
                        }

                        if (onInputChange) {
                            onInputChange(value);
                        }

                        setValue(value);
                    }}
                    {...(props as InputHTMLAttributes<HTMLInputElement>)}
                />
            );
        };

        React.useEffect(() => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = `${value}`;
            const text = tempElement.textContent || tempElement.innerText || '';

            setTextLength(text.length);
        }, [value]);

        return (
            <div className={cn(styles.inputWrapper, wrapperClass)}>
                {(title || trackLength) && (
                    <div className={styles.inputTitleWrapper}>
                        {title && <Text variant="text3">{title}</Text>}
                        {trackLength && (
                            <p
                                className={cn(typography.text3, styles.limitText, {
                                    [styles.limit]: (textLength || 0) >= lengthLimit,
                                })}
                            >
                                {textLength || 0}
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
                        <Tooltip destroyTooltipOnHide title={infoText} placement="topRight">
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
