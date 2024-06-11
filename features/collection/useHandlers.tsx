'use client';

import React from 'react';

import { PairDTO } from '@/entities/collection';
import useAlert from '@/shared/hooks/useAlert';
import { useScrollContext } from '@/shared/context/ScrollProvider';

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

    const removePair = (
        id: number,
        pairs: PairDTO[],
        setPairs: (value: React.SetStateAction<PairDTO[]>) => void,
        setPairsEmptyIds: (value: React.SetStateAction<number[]>) => void,
    ) => {
        const updatedObjects = [...pairs];
        updatedObjects.splice(id, 1);
        setPairs(updatedObjects);
        setPairsEmptyIds((prev) => prev.filter((item) => item !== id));
    };

    const validateHandler = (
        pairs: PairDTO[],
        questionText: string,
        questionImage: string,
        answerText: string,
        answerImage: string,
        setErrors: (value: React.SetStateAction<number[]>) => void,
    ) => {
        setErrors([]);
        let newPairs = [...pairs];

        if ((questionText || questionImage) && (answerText || answerImage)) {
            newPairs = [
                ...newPairs,
                {
                    questionText,
                    questionPicture: questionImage,
                    answerText,
                    answerPicture: answerImage,
                },
            ];
        }

        let hasEmptyField = false;

        if ((!questionText && !questionImage) || (!answerText && !answerImage)) {
            setErrors((prev) => [...prev, -1]);
            hasEmptyField = true;
        }

        for (let i = 0; i < pairs.length; i++) {
            if (
                (!pairs[i].questionText && !pairs[i].questionPicture) ||
                (!pairs[i].answerText && !pairs[i].answerPicture)
            ) {
                setErrors((prev) => [...prev, i]);
                hasEmptyField = true;
            }
        }

        if (hasEmptyField) {
            return alertNotify('Предупреждение', 'Не все поля заполнены', 'warn');
        }

        if (newPairs.length < 2) {
            return alertNotify('Предупреждение', 'Нельзя создать коллекцию, в которой меньше 2-х терминов', 'warn');
        }

        return newPairs;
    };

    return {
        scrollBottom,
        scrollTop,
        removePair,
        validateHandler,
    };
};

export default useHandlers;
