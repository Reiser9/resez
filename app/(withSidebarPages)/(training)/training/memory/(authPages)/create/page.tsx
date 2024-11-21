'use client';

import React from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import base from '@/shared/styles/base.module.scss';
import styles from '../../index.module.scss';

import type { PairDTO } from '@/entities/collection/model';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { Excel } from '@/shared/icons';
import useAlert from '@/shared/hooks/useAlert';
import ImportExcel from './ui/ImportExcel';
import { useCollections, useHandlers } from '@/features/collection';
import PairItem from './ui/PairItem';
import { CONFIG } from '@/shared/consts/CONFIG';

import { Button, IconButton } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

const emptyPair = {
    questionText: '',
    questionPicture: '',
    answerText: '',
    answerPicture: '',
    id: Date.now(),
};

const MemoryCreate = () => {
    const [importExcelModal, setImportExcelModal] = React.useState(false);

    const [name, setName] = React.useState('');
    const [withDescription, setWithDescription] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [privateCollection, setPrivateCollection] = React.useState(false);

    const [pairs, setPairs] = React.useState<PairDTO[]>([emptyPair]);
    const [pairsEmptyIds, setPairsEmptyIds] = React.useState<number[]>([]);

    const [activePair, setActivePair] = React.useState<PairDTO>();

    const { alertNotify } = useAlert();
    const { createCollection } = useCollections();
    const { validateHandler, scrollBottom, addNewPair, removePair, sensors, handleDragStart, handleDragEnd } =
        useHandlers();
    const router = useRouter();

    const createCollectionHandler = async () => {
        const newPairs = validateHandler(pairs, setPairsEmptyIds);

        if (!newPairs) {
            return;
        }

        if (!name) {
            return alertNotify('Предупреждение', 'Название не должно быть пустым', 'warn');
        }

        const newCollection = await createCollection(
            name,
            withDescription ? description : '',
            privateCollection,
            newPairs,
        );

        if (!newCollection) {
            return;
        }

        router.replace(`/training/memory/${newCollection.id}`);
    };

    return (
        <CreatePageWrapper
            title="Создание коллекции"
            button={
                <Button auto onClick={createCollectionHandler} levitation>
                    Создать
                </Button>
            }
            rightButton={
                <Tooltip destroyTooltipOnHide title="Импорт через Exсel">
                    <IconButton variant="light" onClick={() => setImportExcelModal(true)}>
                        <Excel />
                    </IconButton>
                </Tooltip>
            }
        >
            <div className={cn(base.baseWrapperGap16, styles.addCardCollectionForm, base.aic)}>
                <Input value={name} setValue={setName} title="Название" lengthLimit={75} trackLength />

                <Checkbox checked={withDescription} onChange={(e) => setWithDescription(e.target.checked)}>
                    Добавить описание
                </Checkbox>

                {withDescription && (
                    <Input
                        variant="textarea"
                        value={description}
                        setValue={setDescription}
                        title="Описание"
                        lengthLimit={500}
                        trackLength
                    />
                )}

                <Checkbox checked={privateCollection} onChange={(e) => setPrivateCollection(e.target.checked)}>
                    Скрыть от других пользователей
                </Checkbox>

                <div className={styles.cardCollectionInfo}>
                    <Text fontWeight={600} variant="text2">
                        Пары: {pairs.length}
                    </Text>

                    <Text fontWeight={600} variant="text2">
                        Максимум пар: {CONFIG.MAX_PAIRS_COUNT}
                    </Text>
                </div>

                <div className={styles.cardCollectionWrapper}>
                    <DndContext
                        sensors={sensors}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={(event) => handleDragEnd(event, pairs, setPairs)}
                        onDragStart={(event) => handleDragStart(event, setActivePair)}
                    >
                        <SortableContext items={pairs}>
                            {pairs.map((data, id) => (
                                <PairItem
                                    key={data.id}
                                    data={data}
                                    number={id}
                                    error={pairsEmptyIds.includes(data.id)}
                                    answerImageId={`answerImage${data.id}`}
                                    questionImageId={`questionImage${data.id}`}
                                    pairs={pairs}
                                    setPairs={setPairs}
                                    removePair={() => removePair(data.id, pairs, setPairs, setPairsEmptyIds)}
                                />
                            ))}
                        </SortableContext>

                        {createPortal(
                            <DragOverlay>
                                {activePair && (
                                    <PairItem
                                        data={activePair}
                                        number={pairs.findIndex((item) => item.id === activePair.id)}
                                        error={pairsEmptyIds.includes(activePair.id)}
                                        answerImageId={`answerImage${activePair.id}`}
                                        questionImageId={`questionImage${activePair.id}`}
                                        pairs={pairs}
                                        setPairs={setPairs}
                                        removePair={() => removePair(activePair.id, pairs, setPairs, setPairsEmptyIds)}
                                    />
                                )}
                            </DragOverlay>,
                            document.body,
                        )}
                    </DndContext>

                    {pairs.length < CONFIG.MAX_PAIRS_COUNT && (
                        <Button auto variant="light" onClick={() => addNewPair(pairs, setPairs)}>
                            Добавить
                        </Button>
                    )}
                </div>
            </div>

            <ImportExcel
                valueModal={importExcelModal}
                setValueModal={setImportExcelModal}
                scrollBottom={scrollBottom}
                pairs={pairs}
                setPairs={setPairs}
            />
        </CreatePageWrapper>
    );
};

export default MemoryCreate;
