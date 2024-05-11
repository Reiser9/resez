import React from 'react';

import base from '@/shared/styles/base.module.scss';

import { Brain, Teach } from '@/shared/icons';
import { InfoBlock } from '@/shared/ui/InfoBlock';
import { LinkBlock } from '@/shared/ui/LinkBlock';

const TrainingPage = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <InfoBlock
                icon={<Brain />}
                title="Тренинг для развития умственных способностей"
                text="Здесь вы найдете разнообразные тренировки, которые помогут вам улучшить память, концентрацию, логическое мышление и другие когнитивные функции. Наши тренинги помогут вам стать более эффективным в учебе"
                image={<Teach />}
            />

            <div className={base.contentItems}>
                <LinkBlock
                    href="/training/memory"
                    title="Тренировка памяти"
                    text="Изучение материала эффективно и интерактивно, запоминай легко"
                    className={base.item3}
                />

                <LinkBlock
                    href="/training/battle"
                    title="Битва знатоков"
                    text="Соревнуйтесь в заданиях между пользователями сайта"
                    className={base.item3}
                    disabled
                />
            </div>
        </div>
    );
};

export default TrainingPage;
