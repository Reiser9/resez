'use client';

import React, { HTMLAttributes } from 'react';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import pws from '@/shared/styles/pageWithSidebar.module.scss';

import { MenuBlock } from '@/shared/icons';

type Props = {
    icon?: React.ReactNode;
    big?: boolean;
    value?: boolean;
    setValue?: (value: boolean) => void;
    children: React.ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const InnerSidebar: React.FC<Props> = ({
    icon = <MenuBlock />,
    big = false,
    value,
    setValue,
    className,
    children,
    ...props
}) => {
    const [sidebarActive, setSidebarActive] = React.useState<boolean>(false);

    const pathname = usePathname();

    const toggleSidebar = (value: boolean): void => {
        if (setValue) {
            return setValue(value);
        }

        setSidebarActive(value);
    };

    React.useEffect(() => {
        if (setValue) {
            return setValue(false);
        }

        setSidebarActive(false);
    }, [pathname, setValue]);

    React.useEffect(() => {
        if (setValue && value) {
            setSidebarActive(value);
        }
    }, [value, setValue]);

    return (
        <>
            <div
                className={cn({
                    [pws.active]: value || sidebarActive,
                    [pws.sidebarOverlayBig]: big,
                    [pws.sidebarOverlay]: !big,
                })}
                onClick={() => toggleSidebar(false)}
                {...props}
            >
                <div className={pws.sidebarWrapper}>
                    <div
                        className={cn(pws.sidebar, className, {
                            [pws.active]: value || sidebarActive,
                        })}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}
                    </div>
                </div>
            </div>

            <button
                className={cn(pws.sidebarMenu, {
                    [pws.active]: value || sidebarActive,
                })}
                onClick={() => toggleSidebar(true)}
            >
                {icon}
            </button>
        </>
    );
};

export default InnerSidebar;
