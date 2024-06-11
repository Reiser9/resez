<<<<<<< HEAD
"use client";

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';

import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';
import Link from 'next/link';

const UsefulTasks = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <ScrollWithArrows>
                <Link href="/useful/tasks/russian" replace className={cn(base.tag, base.active)}>Русский язык</Link>
                <Link href="/useful/tasks/math" replace className={cn(base.tag)}>Математика</Link>
                <Link href="/useful/tasks/history" replace className={cn(base.tag)}>История</Link>
                <Link href="/useful/tasks/informatics" replace className={cn(base.tag)}>Информатика</Link>
            </ScrollWithArrows>
        </div>
    );
};

export default UsefulTasks;
=======
"use client";

import React from 'react';
import cn from 'classnames';

import base from '@/shared/styles/base.module.scss';

import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';
import Link from 'next/link';

const UsefulTasks = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <ScrollWithArrows>
                <Link href="/useful/tasks/russian" replace className={cn(base.tag, base.active)}>Русский язык</Link>
                <Link href="/useful/tasks/math" replace className={cn(base.tag)}>Математика</Link>
                <Link href="/useful/tasks/history" replace className={cn(base.tag)}>История</Link>
                <Link href="/useful/tasks/informatics" replace className={cn(base.tag)}>Информатика</Link>
            </ScrollWithArrows>
        </div>
    );
};

export default UsefulTasks;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
