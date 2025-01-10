'use client';

import React from 'react';
import Image from 'next/image';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Chart, Headphones, ResCoin, Settings, Task } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';

const Store = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <div className={styles.storeMain}>
                <div className={styles.storeMainTextInner}>
                    <div className={styles.storeMainTextWrapper}>
                        <Text variant="h3" color="white">
                            Получите максимум с подпиской Premium
                        </Text>

                        <Text color="white">
                            Откройте доступ к эксклюзивным функциям ResEz. Подписка Premium — это ваш путь к ещё более
                            эффективной и удобной подготовке.
                        </Text>
                    </div>

                    <div className={styles.storeMainTags}>
                        <div className={styles.storeMainTag}>
                            <Settings />
                            Персональная настройка
                        </div>

                        <div className={styles.storeMainTag}>
                            <Chart />
                            Подробная аналитика
                        </div>

                        <div className={styles.storeMainTag}>
                            <Task />
                            Эксклюзивные задания
                        </div>

                        <div className={styles.storeMainTag}>
                            <Headphones />
                            Приоритетная поддержка
                        </div>
                    </div>
                </div>

                <div className={styles.storeMainBanner}>
                    <div className={styles.storeMainBannerImgInner}>
                        <Image src="/img/gift.svg" alt="gift" fill className={styles.storeMainBannerImg} />
                    </div>

                    <div className={styles.storeMainBannerTextInner}>
                        <Text fontWeight={600} color="main">
                            Подписка на месяц
                        </Text>

                        <div className={styles.storeMainBannerPrice}>
                            от <span>99</span>
                            <ResCoin />
                        </div>
                    </div>

                    <Button auto href="/store/subscription">
                        Попробовать
                    </Button>
                </div>
            </div>

            <div className={styles.storeWrapper}>
                <div className={styles.storeSettings}>
                    <div className={styles.storeSettingsImageInner}>
                        <Image src="/img/settings.svg" alt="settings" fill className={styles.storeSettingsImage} />
                    </div>

                    <div className={styles.storeTextBlock}>
                        <Text variant="h2" color="main">
                            Настраивай
                            <br />
                            платформу под себя!
                        </Text>

                        <Text fontWeight={500}>
                            В магазине персонализации вы найдёте уникальные темы оформления, аватары и другие элементы,
                            которые сделают вашу подготовку ярче и приятнее.
                        </Text>
                    </div>

                    <Button href="/store/personalization" auto>
                        Перейти в магазин
                    </Button>
                </div>

                <div className={styles.storeCoins}>
                    <div className={styles.storeCoinImageInner}>
                        <Image src="/img/coins.svg" alt="coins" fill className={styles.storeCoinImage} />
                    </div>

                    <div className={styles.storeTextBlock}>
                        <Text variant="h2" color="main">
                            Зарабатывайте
                            <br />
                            и используйте монеты
                        </Text>

                        <Text fontWeight={500}>
                            ResCoin — это ваш способ сделать платформу уникальной! Зарабатывайте их, выполняя задания и
                            достижения, или приобретайте, чтобы быстрее открыть доступ к персонализации.
                        </Text>
                    </div>

                    <Button href="/store/coins" auto>
                        Подробнее
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Store;
