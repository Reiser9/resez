import React from 'react';

import base from '@/shared/styles/base.module.scss';

import { Information, StudyHat } from '@/shared/icons';
import { InfoBlock } from '@/shared/ui/InfoBlock';
import { LinkBlock } from '@/shared/ui/LinkBlock';

const UsefulPage = () => {
    return (
        <div className={base.baseWrapperGap16}>
            <InfoBlock
                icon={<StudyHat />}
                title="Куча полезной информации"
                text="Здесь вы сможете узнать о лучших методах организации времени, техниках запоминания материала, а также получить полезные ресурсы и ссылки для дополнительного обучения. Эта страница станет вашим надежным помощником в достижении успеха в учебе"
                image={<Information />}
            />

            <div className={base.contentItems}>
                <LinkBlock
                    href="/useful/points"
                    title="Баллы ЕГЭ"
                    text="Информация по баллам ко всем предметам"
                    className={base.item3}
                />

                <LinkBlock
                    href="/useful/tasks"
                    title="Разбор заданий"
                    text="Шпоргалки и напоминалки по каждому заданию ЕГЭ"
                    className={base.item3}
                />
            </div>
        </div>
    );
};

export default UsefulPage;
