"use client";

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import base from '@/shared/styles/base.module.scss';

import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';

const UsefulTasks = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <ScrollWithArrows>
                <Link prefetch={false} href="/useful/tasks/russian" replace className={cn(base.tag, base.active)}>Русский язык</Link>
                <Link prefetch={false} href="/useful/tasks/math" replace className={cn(base.tag)}>Математика</Link>
                <Link prefetch={false} href="/useful/tasks/history" replace className={cn(base.tag)}>История</Link>
                <Link prefetch={false} href="/useful/tasks/informatics" replace className={cn(base.tag)}>Информатика</Link>
            </ScrollWithArrows>
        </div>
    );
};

export default UsefulTasks;
