'use client';

import React from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { createPortal } from 'react-dom';

import base from '@/shared/styles/base.module.scss';
import styles from '../../../index.module.scss';

import type { PairDTO } from '@/entities/collection/model';
import useAlert from '@/shared/hooks/useAlert';
import ImportExcel from '../../create/ui/ImportExcel';
import PairItem from '../../create/ui/PairItem';
import useShortInfo from '@/features/user/data/useShortInfo';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { Excel } from '@/shared/icons';
import { useCollections, useHandlers } from '@/features/collection';
import { CONFIG } from '@/shared/consts/CONFIG';

import { Button, IconButton } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

const MemoryEdit = () => {
    const [importExcelModal, setImportExcelModal] = React.useState(false);

    const [name, setName] = React.useState('');
    const [withDescription, setWithDescription] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [privateCollection, setPrivateCollection] = React.useState(false);

    const [pairs, setPairs] = React.useState<PairDTO[]>([]);
    const [pairsEmptyIds, setPairsEmptyIds] = React.useState<number[]>([]);

    const [activePair, setActivePair] = React.useState<PairDTO>();

    const { alertNotify } = useAlert();
    const { updateCollection, getCollectionById } = useCollections();
    const { getShortInfo } = useShortInfo();
    const { validateHandler, scrollBottom, addNewPair, removePair, handleDragStart, handleDragEnd, sensors } =
        useHandlers();
    const router = useRouter();
    const { id } = useParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ['collection_by_id', id],
        queryFn: () => getCollectionById(String(id)),
        enabled: !!id,
    });

    const { data: user, isLoading: userIsLoading } = useQuery({
        queryKey: ['short_info'],
        queryFn: () => getShortInfo(),
    });

    const { id: userId } = user?.user || {};

    const editCollectionHandler = () => {
        const newPairs = validateHandler(pairs, setPairsEmptyIds);

        if (!newPairs || !data?.id) {
            return;
        }

        if (!name) {
            return alertNotify('Предупреждение', 'Название не должно быть пустым', 'warn');
        }

        updateCollection(data.id, name, withDescription ? description : '', privateCollection, newPairs, () =>
            router.replace(`/training/memory/${data.id}`),
        );
    };

    React.useEffect(() => {
        if (data) {
            if (data.user.id !== userId) {
                return router.replace('/training/memory');
            }

            const { collection, description, isPrivate, pairs } = data;

            setName(collection);

            if (description) {
                setWithDescription(true);
                setDescription(description);
            }

            setPrivateCollection(isPrivate);
            setPairs(pairs);
        }
    }, [data]);

    React.useEffect(() => {
        if (isError) {
            return router.replace('/training/memo');
        }
    }, [isError]);

    if (isLoading) {
        return <Preloader page />;
    }

    return (
        <CreatePageWrapper
            title="Редактирование коллекции"
            button={
                <Button auto onClick={editCollectionHandler} levitation>
                    Сохранить
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
                <Input value={name} setValue={setName} placeholder="Название" lengthLimit={75} trackLength />

                <Checkbox checked={withDescription} onChange={(e) => setWithDescription(e.target.checked)}>
                    Добавить описание
                </Checkbox>

                {withDescription && (
                    <Input
                        variant="textarea"
                        value={description}
                        setValue={setDescription}
                        placeholder="Описание"
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

export default MemoryEdit;
