'use client';

import React from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useRouter } from 'next/navigation';

import base from '@/shared/styles/base.module.scss';
import styles from '../../index.module.scss';

import type { PairDTO } from '@/entities/collection/model';
import { Button, IconButton } from '@/shared/ui/Button';
import { CreatePageWrapper } from '@/shared/wrappers/CreatePageWrapper';
import { Excel } from '@/shared/icons';
import useAlert from '@/shared/hooks/useAlert';
import ImportExcel from './ui/ImportExcel';
import { useCollections, useHandlers } from '@/features/collection';

import PairItem from './ui/PairItem';
// import PairItemForm from './ui/PairItemForm';

import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';

const maxPairCount = 500;

const emptyPair = {
    questionText: '',
    questionPicture: '',
    answerText: '',
    answerPicture: '',
};

const MemoryCreate = () => {
    const [importExcelModal, setImportExcelModal] = React.useState(false);

    const [name, setName] = React.useState('');
    const [withDescription, setWithDescription] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [privateCollection, setPrivateCollection] = React.useState(false);

    // const [questionText, setQuestionText] = React.useState('');
    // const [answerText, setAnswerText] = React.useState('');
    // const [questionImage, setQuestionImage] = React.useState('');
    // const [answerImage, setAnswerImage] = React.useState('');

    const [pairs, setPairs] = React.useState<PairDTO[]>([emptyPair]);
    const [pairsEmptyIds, setPairsEmptyIds] = React.useState<number[]>([]);

    const { alertNotify } = useAlert();
    const { createCollection } = useCollections();
    const { validateHandler, scrollBottom, removePair } = useHandlers();
    const router = useRouter();

    const addNewPair = () => {
        setPairs((prev) => [...prev, emptyPair]);
        scrollBottom();
    };

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
                <Tooltip title="Импорт через Exсel">
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
                        Максимум пар: {maxPairCount}
                    </Text>
                </div>

                <div className={styles.cardCollectionWrapper}>
                    {pairs.map((data, id) => (
                        <PairItem
                            key={id}
                            data={data}
                            id={id}
                            error={pairsEmptyIds.includes(id)}
                            answerImageId={`answerImage${id}`}
                            questionImageId={`questionImage${id}`}
                            pairs={pairs}
                            setPairs={setPairs}
                            addNewPair={addNewPair}
                            removePair={() => removePair(id, pairs, setPairs, setPairsEmptyIds)}
                        />
                    ))}

                    {/* <PairItemForm
                        pairs={pairs}
                        setPairs={setPairs}
                        addNewPair={addNewPair}
                        error={pairsEmptyIds.includes(-1)}
                        setError={setPairsEmptyIds}
                        questionText={questionText}
                        setQuestionText={setQuestionText}
                        questionPicture={questionImage}
                        setQuestionPicture={setQuestionImage}
                        answerText={answerText}
                        setAnswerText={setAnswerText}
                        answerPicture={answerImage}
                        setAnswerPicture={setAnswerImage}
                    /> */}

                    <Button auto variant="light" onClick={addNewPair}>
                        Добавить
                    </Button>
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
