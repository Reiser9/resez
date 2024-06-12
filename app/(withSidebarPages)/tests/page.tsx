'use client';

import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import ScrollWithArrows from '@/shared/ui/ScrollWithArrow/ScrollWithArrow';
import { InfoBlock } from '@/shared/ui/InfoBlock';
import { Stack, Tests, TypesTest } from '@/shared/icons';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { NotContent } from '@/shared/ui/NotContent';

const TestsPage = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <ScrollWithArrows>
                <Link href="/useful/points/russian" replace className={cn(base.tag, base.active)}>
                    Русский язык
                </Link>
                <Link href="/useful/points/math" replace className={cn(base.tag)}>
                    Математика
                </Link>
                <Link href="/useful/points/history" replace className={cn(base.tag)}>
                    История
                </Link>
                <Link href="/useful/points/informatics" replace className={cn(base.tag)}>
                    Информатика
                </Link>
            </ScrollWithArrows>

            <InfoBlock
                icon={<Stack />}
                title="Создайте свой вариант из заданных заданий"
                text="Пройдите или создайте свой уникальный тест, выбирая задания из предложенных вариантов. Узнайте свой уровень знаний, составляя набор заданий, который соответствует вашим интересам и целям. Начните свой путь к успеху уже сегодня!"
                button={
                    <Button href="/tests/my/create" auto variant="light" small className={styles.testWelcomeButton}>
                        Создать вариант
                    </Button>
                }
                image={<TypesTest />}
            />

            <div className={base.baseWrapperGap12}>
                <div className={base.titleInner}>
                    <Text variant='h4'>Варианты от ResEz</Text>

                    <Button auto small variant="light" href="/tests/recommended/123">
                        Смотреть все
                    </Button>
                </div>

                <div className={base.contentItems}>
                    {/* {testsRecommendedIsLoading || subjectsIsLoading ? (
                        [...Array(3)].map((_, id) => <TestItemSkeletion key={id} />)
                    ) : testsRecommended?.tests?.length > 0 ? (
                        testsRecommended?.tests?.slice(0, 3).map((data) => <TestItem key={data.id} data={data} />)
                    ) : (
                        <NotContent text="Вариантов не найдено" icon={<Tests />} />
                    )} */}

                    <NotContent text="Вариантов не найдено" icon={<Tests />} />
                </div>
            </div>

            <div className={base.baseWrapperGap12}>
                <Text variant='h4'>Каталог заданий</Text>

                <div className={base.contentItems}>
                    {/* {taskCatalogIsLoading || subjectsIsLoading ? (
                        [...Array(4)].map((_, id) => <CatalogItemSkeleton key={id} />)
                    ) : error ? (
                        <NotContent text="Ошибка при загрузке тестов" danger icon={<Cross />} />
                    ) : taskCatalog.length > 0 ? (
                        taskCatalog?.map((data) => <CatalogItem key={data.id} data={data} />)
                    ) : (
                        <NotContent text="Заданий не найдено" />
                    )} */}
                    
                    <NotContent text="Заданий не найдено" />
                </div>
            </div>
        </div>
    );
};

export default TestsPage;
