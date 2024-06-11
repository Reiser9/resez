'use client';

import React from 'react';
import cn from 'classnames';
import { Checkbox, Tooltip } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import base from '@/shared/styles/base.module.scss';
import styles from '../../index.module.scss';

import type { PairDTO } from '@/entities/collection/model';
import { Button, IconButton } from '@/shared/ui/Button';
import CreatePageDefault from '@/shared/wrappers/CreatePageWrapper/CreatePageWrapper';
import { Input } from '@/shared/ui/Input';
import { Excel } from '@/shared/icons';
import useAlert from '@/shared/hooks/useAlert';
import { useCollections, useHandlers } from '@/features/collection';
import ImportExcel from '../../create/ui/ImportExcel';
import PairItem from '../../create/ui/PairItem';
import PairItemForm from '../../create/ui/PairItemForm';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Preloader } from '@/shared/ui/Preloader';

const MemoryEdit = () => {
    const [importExcelModal, setImportExcelModal] = React.useState(false);

    const [name, setName] = React.useState('');
    const [withDescription, setWithDescription] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [privateCollection, setPrivateCollection] = React.useState(false);

    const [questionText, setQuestionText] = React.useState('');
    const [answerText, setAnswerText] = React.useState('');
    const [questionImage, setQuestionImage] = React.useState('');
    const [answerImage, setAnswerImage] = React.useState('');

    const [pairs, setPairs] = React.useState<PairDTO[]>([]);
    const [pairsEmptyIds, setPairsEmptyIds] = React.useState<number[]>([]);

    const { alertNotify } = useAlert();
    const { updateCollection, getCollectionById } = useCollections();
    const { validateHandler, scrollBottom } = useHandlers();
    const router = useRouter();
    const { id } = useParams();
    const userId = useAppSelector((state) => state.user.user?.id);

    const { data, error, isLoading } = useQuery({
        queryKey: ['collection_by_id', id],
        queryFn: () => getCollectionById(String(id)),
        enabled: !!id,
    });

    const addNewPair = () => {
        setPairs((prev) => [
            ...prev,
            {
                questionText,
                answerText,
                questionPicture: questionImage,
                answerPicture: answerImage,
            },
        ]);
        setQuestionText('');
        setAnswerText('');
        setQuestionImage('');
        setAnswerImage('');
        scrollBottom();
    };

    const removePair = (id: number) => {
        const updatedObjects = [...pairs];
        updatedObjects.splice(id, 1);
        setPairs(updatedObjects);
        setPairsEmptyIds((prev) => prev.filter((item) => item !== id));
    };

    const editCollectionHandler = () => {
        const newPairs = validateHandler(pairs, questionText, questionImage, answerText, answerImage, setPairsEmptyIds);

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
            if(data.user.id !== userId){
                return router.replace("/training/memo");
            }

            const { collection, description, isPrivate, pairs } = data;

            setName(collection);

            if (description) {
                setWithDescription(true);
                setDescription(description);
            }

            setPrivateCollection(isPrivate);

            const lastPair = pairs.splice(-1)[0];
            const { questionText, questionPicture, answerText, answerPicture } = lastPair;

            setPairs(pairs);
            setQuestionText(questionText);
            setQuestionImage(questionPicture);
            setAnswerText(answerText);
            setAnswerImage(answerPicture);
        }
    }, [data]);

    React.useEffect(() => {
        if(error){
            return router.replace("/training/memo");
        }
    }, [error]);

    if(isLoading){
        return <Preloader page />
    }

    return (
        <CreatePageDefault
            title="Редактирование коллекции"
            button={
                <Button auto onClick={editCollectionHandler} levitation>
                    Сохранить
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
                            removePair={() => removePair(id)}
                        />
                    ))}

                    <PairItemForm
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
                    />

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
        </CreatePageDefault>
    );
};

export default MemoryEdit;
