'use client';

import React from 'react';
import {
    DragEndEvent,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import type { PairDTO } from '@/entities/collection';
import useAlert from '@/shared/hooks/useAlert';
import { useScrollContext } from '@/shared/context/ScrollProvider';
import { CONFIG } from '@/shared/consts/CONFIG';

const useHandlers = () => {
    const { alertNotify } = useAlert();
    const { scrollBlock } = useScrollContext();

    const scrollBottom = () => {
        setTimeout(
            () =>
                scrollBlock.current?.scrollTo({
                    top: scrollBlock.current.scrollHeight,
                    behavior: 'smooth',
                }),
            100,
        );
    };

    const scrollTop = () => {
        setTimeout(
            () =>
                scrollBlock.current?.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                }),
            100,
        );
    };

    const addNewPair = (pairs: PairDTO[], setPairs: (value: React.SetStateAction<PairDTO[]>) => void) => {
        if (pairs.length >= CONFIG.MAX_PAIRS_COUNT) {
            return alertNotify(
                'Предупреждение',
                `Максимальное количество пар карточек - ${CONFIG.MAX_PAIRS_COUNT}`,
                'warn',
            );
        }

        setPairs((prev) => [
            ...prev,
            {
                questionText: '',
                questionPicture: '',
                answerText: '',
                answerPicture: '',
                id: Date.now(),
            },
        ]);
        scrollBottom();
    };

    const removePair = (
        id: number,
        pairs: PairDTO[],
        setPairs: (value: React.SetStateAction<PairDTO[]>) => void,
        setPairsEmptyIds: (value: React.SetStateAction<number[]>) => void,
    ) => {
        const updatedObjects = [...pairs];
        const filteredObjects = updatedObjects.filter((pair) => pair.id !== id);
        setPairs(filteredObjects);
        setPairsEmptyIds((prev) => prev.filter((item) => item !== id));
    };

    const validateHandler = (pairs: PairDTO[], setErrors: (value: React.SetStateAction<number[]>) => void) => {
        setErrors([]);
        const newPairs = [...pairs];
        let hasEmptyField = false;

        pairs.forEach((pair) => {
            const { questionText, questionPicture, answerText, answerPicture, id } = pair;
            if ((!questionText && !questionPicture) || (!answerText && !answerPicture)) {
                setErrors((prev) => [...prev, id]);
                hasEmptyField = true;
            }
        });

        if (hasEmptyField) {
            return alertNotify('Предупреждение', 'Не все поля заполнены', 'warn');
        }

        if (newPairs.length < 2) {
            return alertNotify('Предупреждение', 'Нельзя создать коллекцию, в которой меньше 2-х терминов', 'warn');
        }

        return newPairs;
    };

    const handleDragEnd = (
        event: DragEndEvent,
        pairs: PairDTO[],
        setPairs: (value: React.SetStateAction<PairDTO[]>) => void,
    ) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        setPairs((prev) => {
            const oldIndex = prev.findIndex((item) => item.id === active.id);
            const newIndex = prev.findIndex((item) => item.id === over.id);
            return arrayMove(pairs, oldIndex, newIndex);
        });
    };

    const handleDragStart = (event: DragStartEvent, setActivePair: (value: PairDTO) => void) => {
        if (event.active.data.current) {
            setActivePair(event.active.data.current.data);
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return {
        scrollBottom,
        scrollTop,
        addNewPair,
        removePair,
        validateHandler,
        sensors,
        handleDragStart,
        handleDragEnd,
    };
};

export default useHandlers;
