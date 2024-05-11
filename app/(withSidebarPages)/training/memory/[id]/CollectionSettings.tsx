'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import styles from './index.module.scss';

import { Modal } from '@/shared/ui/Modal';
import { NotContent } from '@/shared/ui/NotContent';
import { Button } from '@/shared/ui/Button';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { SettingsItem } from '@/shared/ui/SettingsItem';
import { Settings } from '@/shared/icons';
import { useCollections } from '@/features/collection';
import { Input } from '@/shared/ui/Input';

type Props = {
    id: number | string;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
};

const CollectionSettings: React.FC<Props> = ({ id, openModal, setOpenModal }) => {
    const [shuffleCardsLocal, setShuffleCardsLocal] = React.useState(false);
    const [cardsAnswerOnFrontLocal, setCardsAnswerOnFrontLocal] = React.useState(false);

    const [shuffleTestLocal, setShuffleTestLocal] = React.useState(false);
    const [testAnswerOnFrontLocal, setTestAnswerOnFrontLocal] = React.useState(false);
    const [maxQuestionsLocal, setMaxQuestionsLocal] = React.useState("");
    const [answerChoiceModeLocal, setAnswerChoiceModeLocal] = React.useState(false);
    const [trueFalseModeLocal, setTrueFalseModeLocal] = React.useState(false);
    const [writeModeLocal, setWriteModeLocal] = React.useState(false);

    const { isLoading: settingsIsLoading, getCollectionSettings, updateSettings } = useCollections();

    const { data, isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ['memory_settings', id],
        queryFn: getCollectionSettings,
        enabled: openModal,
    });

    const updateSettingsHandler = async () => {
        await updateSettings(
            {
                shuffleCards: shuffleCardsLocal,
                cardsAnswerOnFront: cardsAnswerOnFrontLocal,
                shuffleTest: shuffleTestLocal,
                testAnswerOnFront: testAnswerOnFrontLocal,
                maxQuestions: Number(maxQuestionsLocal),
                showAnswerImmediately: false,
                shuffleMemorization: false,
                answerChoiceMode: answerChoiceModeLocal,
                trueFalseMode: trueFalseModeLocal,
                writeMode: writeModeLocal,
            },
            () => setOpenModal(false),
        );
    };

    const checkMods = (number: number) => {
        if(!answerChoiceModeLocal && !trueFalseModeLocal && !writeModeLocal){
            const mods = [setAnswerChoiceModeLocal, setTrueFalseModeLocal, setWriteModeLocal];
            mods.splice(number, 1);
            const random = Math.floor(Math.random() * (3 - 1) + 1);

            if(random === 1){
                mods[0](true);
            }
            else{
                mods[1](true);
            }
        }
    }

    React.useEffect(() => {
        checkMods(0);
    }, [answerChoiceModeLocal]);

    React.useEffect(() => {
        checkMods(1);
    }, [trueFalseModeLocal]);

    React.useEffect(() => {
        checkMods(2);
    }, [writeModeLocal]);

    React.useEffect(() => {
        if (data && data.settings) {
            const {
                shuffleCards,
                cardsAnswerOnFront,
                shuffleTest,
                testAnswerOnFront,
                maxQuestions,
                answerChoiceMode,
                trueFalseMode,
                writeMode,
            } = data.settings;

            setShuffleCardsLocal(shuffleCards);
            setCardsAnswerOnFrontLocal(cardsAnswerOnFront);
            setShuffleTestLocal(shuffleTest);
            setTestAnswerOnFrontLocal(testAnswerOnFront);
            setMaxQuestionsLocal(String(maxQuestions));
            setAnswerChoiceModeLocal(answerChoiceMode);
            setTrueFalseModeLocal(trueFalseMode);
            setWriteModeLocal(writeMode);
        }
    }, [data]);

    return (
        <Modal title="Настройки" value={openModal} setValue={setOpenModal} size="small">
            {error ? (
                <NotContent text="Ошибка при загрузке настроек" danger icon={<Settings />}>
                    <Button variant="light" auto onClick={refetch} loading={isFetching} small>
                        Загрузить еще раз
                    </Button>
                </NotContent>
            ) : isLoading ? (
                <Preloader page small />
            ) : (
                <div className={styles.memoSettingsContent}>
                    <div className={styles.memoSettingsItem}>
                        <Text variant="h4" fontWeight={700}>
                            Карточки
                        </Text>

                        <SettingsItem
                            title="Перемешать"
                            text="Каждый раз когда вы будете играть, карточки будут попадаться в случайном порядке"
                            checked={shuffleCardsLocal}
                            name="shuffleCards"
                            fullWidth
                            setValue={setShuffleCardsLocal}
                        />

                        <SettingsItem
                            title="Ответы сверху"
                            text="Если включено, то ответы будут поменяны местами с вопросами"
                            checked={cardsAnswerOnFrontLocal}
                            name="cardsAnswerOnFront"
                            fullWidth
                            setValue={setCardsAnswerOnFrontLocal}
                        />
                    </div>

                    <div className={styles.memoSettingsItem}>
                        <Text variant="h4" fontWeight={700}>
                            Тест
                        </Text>

                        <SettingsItem
                            title="Перемешать"
                            text="Вопросы будут попадаться в случайном порядке"
                            checked={shuffleTestLocal}
                            name="shuffleTestLocal"
                            fullWidth
                            setValue={setShuffleTestLocal}
                        />

                        <SettingsItem
                            title="Ответы сверху"
                            text="Если включено, то ответы будут поменяны местами с вопросами"
                            checked={testAnswerOnFrontLocal}
                            name="testAnswerOnFrontLocal"
                            fullWidth
                            setValue={setTestAnswerOnFrontLocal}
                        />

                        <div className={styles.memoSettingsQuestion}>
                            <Text fontWeight={600}>Количество вопросов в тесте</Text>

                            <Input
                                wrapperClass={styles.memoSettingsQuestionInput}
                                color="white"
                                value={maxQuestionsLocal}
                                setValue={setMaxQuestionsLocal}
                                type='number'
                                lengthLimit={3}
                            />
                        </div>

                        <div className={styles.memoModsInner}>
                            <Text fontWeight={600} style={{marginBottom: ".8rem"}}>Режимы:</Text>

                            <SettingsItem
                                title="Выбор ответа"
                                checked={answerChoiceModeLocal}
                                name="answerChoiceMode"
                                fullWidth
                                setValue={setAnswerChoiceModeLocal}
                            />

                            <SettingsItem
                                title="Верно или неверное"
                                checked={trueFalseModeLocal}
                                name="trueFalseMode"
                                fullWidth
                                setValue={setTrueFalseModeLocal}
                            />

                            <SettingsItem
                                title="Письменный ответ"
                                checked={writeModeLocal}
                                name="writeMode"
                                fullWidth
                                setValue={setWriteModeLocal}
                            />
                        </div>
                    </div>

                    <div className={styles.memoSettingsItem}>
                        <Text variant="h4" fontWeight={700}>
                            Заучивание
                        </Text>

                        <NotContent text="Для данного типа пока что настройки отсутствуют" icon={<Settings />} />
                    </div>

                    <div className={styles.memoSettingsItem}>
                        <Text variant="h4" fontWeight={700}>
                            Подбор
                        </Text>

                        <NotContent text="Для данного типа пока что настройки отсутствуют" icon={<Settings />} />
                    </div>

                    <Button
                        auto
                        levitation
                        wrapperStyle={{ bottom: '12px' }}
                        onClick={updateSettingsHandler}
                        loading={settingsIsLoading}
                    >
                        Сохранить
                    </Button>
                </div>
            )}
        </Modal>
    );
};

export default CollectionSettings;
