'use client';

import React from 'react';

import styles from './index.module.scss';
import { Text } from '@/shared/ui/Text';

const StoreSubscription = () => {
    return (
        <div className={styles.subscriptionWrapper}>
            <div className={styles.subscriptionPoints}>
                <Text fontWeight={600}>Добавление картинок в коллекциях</Text>
                <Text fontWeight={600}>Размер загружаемых картинок</Text>
                <Text fontWeight={600}>Уникальные персонализации</Text>
            </div>

            <div className={styles.subscriptionElements}>
                <div className={styles.subscriptionItem}>
                    <p className={styles.subscriptionItemName}>Без подписки</p>

                    <div className={styles.subscriptionItemPoints}>
                        <Text fontWeight={600}>-</Text>
                        <Text fontWeight={600}>1 Mb</Text>
                        <Text fontWeight={600}>-</Text>
                    </div>
                </div>

                <div className={styles.subscriptionItem}>
                    <p className={styles.subscriptionItemName}>ResEz Premium</p>

                    <div className={styles.subscriptionItemPoints}>
                        <Text fontWeight={600}>+</Text>
                        <Text fontWeight={600}>5 Mb</Text>
                        <Text fontWeight={600}>+</Text>
                    </div>
                </div>

                <div className={styles.subscriptionItem}>
                    <p className={styles.subscriptionItemName}>ResEz Premium Plus</p>

                    <div className={styles.subscriptionItemPoints}>
                        <Text fontWeight={600}>+</Text>
                        <Text fontWeight={600}>10 Mb</Text>
                        <Text fontWeight={600}>+</Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreSubscription;
