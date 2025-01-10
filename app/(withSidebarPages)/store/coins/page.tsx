'use client';

import React from 'react';

import styles from '../index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Card, Coins, Dialog, Gift, Paintbruh, Receipt } from '@/shared/icons';

const StoreCoins = () => {
    return (
        <div className={base.baseWrapperGap24}>
            <div className={styles.coinsTopInner}>
                <Text variant="h3" color="main">
                    ResCoins - выделитесь среди других
                </Text>

                <Text>
                    Это уникальная валюта на платформе ResEz, которая делает процесс подготовки к ЕГЭ ещё интереснее
                    и уникальнее. Получайте монеты за успешное выполнение заданий или покупайте их, чтобы открыть новые
                    возможности.
                </Text>

                <Button href={process.env.NEXT_PUBLIC_VK_LINK} auto target="_blank">
                    Пополнить
                </Button>
            </div>

            <div className={styles.coinsItems}>
                <div className={styles.coinsItem}>
                    <div className={styles.coinsItemTop}>
                        <Paintbruh />
                        Персонализация
                    </div>

                    <Text fontWeight={500}>
                        Меняйте украшения аватара, темы интерфейса и добавляйте уникальные анимации.
                    </Text>
                </div>

                <div className={styles.coinsItem}>
                    <div className={styles.coinsItemTop}>
                        <Gift />
                        Бонусы
                    </div>

                    <Text fontWeight={500}>Разблокируй эксклюзивные товары для персонализации профиля</Text>
                </div>
            </div>

            <div className={base.baseWrapperGap12}>
                <Text variant="h3" color="main">
                    Как пополнить кошелёк?
                </Text>

                <div className={styles.coinsSteps}>
                    <div className={styles.coinsStep}>
                        <div className={styles.coinsStepTextInner}>
                            <p className={styles.coinsStepStep}>
                                1 шаг
                            </p>

                            <Text fontWeight={500}>
                                Напишите нам в группу VK сколько ResCoins вы хотите купить
                            </Text>
                        </div>

                        <Dialog className={styles.coinsStepDialog} />
                    </div>

                    <div className={styles.coinsStep}>
                        <div className={styles.coinsStepTextInner}>
                            <p className={styles.coinsStepStep}>
                                2 шаг
                            </p>

                            <Text fontWeight={500}>
                                Мы отправим реквизиты для оплаты
                            </Text>
                        </div>

                        <Card className={styles.coinsStepCard} />
                    </div>

                    <div className={styles.coinsStep}>
                        <div className={styles.coinsStepTextInner}>
                            <p className={styles.coinsStepStep}>
                                3 шаг
                            </p>

                            <Text fontWeight={500}>
                                Отправьте нам чек и ваш никнейм на сайте
                            </Text>
                        </div>

                        <Receipt className={styles.coinsStepReceipt} />
                    </div>

                    <div className={styles.coinsStep}>
                        <div className={styles.coinsStepTextInner}>
                            <p className={styles.coinsStepStep}>
                                4 шаг
                            </p>

                            <Text fontWeight={500}>
                                Мы зачислим монеты на ваш аккаунт
                            </Text>
                        </div>

                        <Coins className={styles.coinsStepCoins} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreCoins;
