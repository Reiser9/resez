'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import Tabs from './ui/Tabs';
import { Text } from '@/shared/ui/Text';
import { Button, IconButton, ReloadButton } from '@/shared/ui/Button';
import { ArrowRight } from '@/shared/icons';
import { NotContent } from '@/shared/ui/NotContent';

const Memory = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <Tabs />

            <div className={styles.subscribeBanner}>
                <div className={styles.subscribeContent}>
                    <Text variant="h3">Разблокируйте все возможности с ResEz Premium</Text>

                    <Text variant="text2" fontWeight={600}>
                        Никаких ограничений и спокойная подготовка, именно это получите вы вместе с Resez Premium
                    </Text>

                    <Button auto href="/store/subscription" variant='light'>
                        Подробнее
                    </Button>
                </div>

                <div className={styles.subscribeFoxInner}>
                    <Image src="/img/fox.svg" alt="Fox" fill />
                </div>
            </div>

            <div className={base.baseWrapperGap8}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Популярные
                    </Text>

                    <ReloadButton />
                </div>

                <NotContent text="Скоро все появится" />
            </div>

            <div className={base.baseWrapperGap8}>
                <div className={base.titleInner}>
                    <Text variant="h3">
                        Ваши коллекции
                    </Text>

                    <IconButton href='/training/memory/my' small variant='light' circle>
                        <ArrowRight />
                    </IconButton>
                </div>

                <NotContent text="Скоро все появится" />
            </div>
        </div>
    );
};

export default Memory;
