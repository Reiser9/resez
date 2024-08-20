'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
    value: boolean;
    setValue: (value: boolean) => void;
    button: React.ReactNode;
    big?: boolean;
    placement?: 'left' | 'center' | 'right';
    children?: React.ReactNode;
};

const HoverMenu: React.FC<Props> = ({
    value,
    setValue,
    button,
    big = false,
    placement = 'left',
    children,
    ...props
}) => {
    const menuRef = React.useRef<HTMLDivElement>(null);

    const closeMenu = () => {
        setValue(false);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            closeMenu();
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={styles.hoverMenuWrapper} ref={menuRef} {...props}>
            {button}

            <div
                className={cn(styles.hoverMenuOverlay, styles[placement], {
                    [styles.active]: value,
                    [styles.big]: big,
                })}
                onClick={closeMenu}
            >
                <div className={styles.hoverMenu}>
                    <div className={styles.hoverMenuContent} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HoverMenu;
