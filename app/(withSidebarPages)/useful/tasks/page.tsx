'use client';

import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import base from '@/shared/styles/base.module.scss';

import { UsefulTaskItem } from './ui';

import { ScrollWithArrows } from '@/shared/ui/ScrollWithArrows';
import { Text } from '@/shared/ui/Text';

const UsefulTasks = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={base.baseWrapperGap4}>
                <Text fontWeight={600}>Предмет:</Text>

                <ScrollWithArrows>
                    <Link prefetch={false} href="/useful/tasks/russian" replace className={cn(base.tag, base.active)}>
                        Русский язык
                    </Link>
                    <Link prefetch={false} href="/useful/tasks/math" replace className={cn(base.tag)}>
                        Математика
                    </Link>
                    <Link prefetch={false} href="/useful/tasks/history" replace className={cn(base.tag)}>
                        История
                    </Link>
                    <Link prefetch={false} href="/useful/tasks/informatics" replace className={cn(base.tag)}>
                        Информатика
                    </Link>
                </ScrollWithArrows>
            </div>

            <div className={base.baseWrapperGap4}>
                <Text fontWeight={600}>Задание:</Text>

                <ScrollWithArrows>
                    <Link prefetch={false} href="/useful/tasks/russian/1" replace className={cn(base.tag, base.active)}>
                        1
                    </Link>
                    <Link prefetch={false} href="/useful/tasks/russian/2" replace className={cn(base.tag)}>
                        2
                    </Link>
                    <Link prefetch={false} href="/useful/tasks/russian/3" replace className={cn(base.tag)}>
                        3
                    </Link>
                    <Link prefetch={false} href="/useful/tasks/russian/4" replace className={cn(base.tag)}>
                        4
                    </Link>
                </ScrollWithArrows>
            </div>

            <UsefulTaskItem content="Какой-то текст" />
        </div>
    );
};

export default UsefulTasks;
