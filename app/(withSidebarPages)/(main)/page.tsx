'use client';

import React from 'react';
import Tesseract from 'tesseract.js';

import styles from './page.module.scss';

import { Messenger, Microphone, Practice, Study, Theme } from '@/shared/icons';
import { ContentWrapper } from '@/shared/wrappers/ContentWrapper';
import { Text } from '@/shared/ui/Text';
import { Block } from './ui/Block';
import { IconButton } from '@/shared/ui/Button';
import { File } from '@/shared/ui/File';

const MainPage = () => {
    // const [image, setImage] = React.useState<File>();
    // const [transcript, setTranscript] = React.useState('');
    // const recognition = new window.webkitSpeechRecognition();

    // recognition.lang = 'ru-RU';
    // recognition.interimResults = false;
    // recognition.maxAlternatives = 1;

    // recognition.onresult = function (event: SpeechRecognitionResult) {
    //     const result = event.results[0][0].transcript;
    //     setTranscript(result);
    // };

    // const startRecognition = () => {
    //     recognition.start();
    // };

    // const stopRecognition = () => {
    //     recognition.stop();
    // };

    // React.useEffect(() => {
    //     if (image) {
    //         Tesseract.recognize(image, 'rus', {
    //             logger: (m) => console.log(m),
    //         }).then(({ data: { text } }) => {
    //             console.log(text.replace(/\n/g, ' '));
    //         });
    //     }
    // }, [image]);

    return (
        <ContentWrapper type="full">
            {/* <IconButton variant="light">
                <Microphone />
            </IconButton>

            <p>Запись не идет</p>

            <p style={{ minHeight: 300 }}></p> */}

            {/* <button onClick={startRecognition}>Start</button>
            <button onClick={stopRecognition}>Stop</button>
            <p>{transcript}</p>

            <File id="image" setFile={setImage} />

            <label htmlFor="image">Choose</label> */}

            <div className={styles.mainBlocks}>
                <Block
                    title="Подготовиться к ЕГЭ? <span>Легко!</span>"
                    text="<span>ResEz</span> создан для вашей комфортной подготовки, расскажем все, что вас будет ждать на действующем экзамене."
                    buttonText="Подробнее"
                    href="/useful"
                    icon={<Study />}
                    tag="h1"
                />

                <Block
                    title="Практикуйтесь <span>каждый день</span>"
                    text="В разделе <span>тренинг</span> вы найдете множество упражнений для подготовки."
                    buttonText="Подробнее"
                    href="/training"
                    icon={<Practice />}
                    tag="h2"
                />
            </div>

            <div className={styles.benefits}>
                <Text variant="h1" className={styles.benefitsTitle}>
                    Что мы можем вам предложить?
                </Text>

                <div className={styles.benefitsContent}>
                    <Block
                        title="Достижения"
                        text="Выполняйте задания и получайте опыт, монеты и эксклюзивные награды."
                        size="small"
                        smallPadding
                    />

                    <Block
                        title="Система уровней"
                        text="Соревнуйтесь с друзьями и с другими людьми, с которыми познакомитесь на нашем проекте. Покажите всем, что вы не из робкого десятка."
                        size="small"
                        smallPadding
                    />

                    <Block
                        title="Техническая поддержка"
                        text="Что бы у вас не случилось - мы всегда на связи и поможем решить любой ваш вопрос. Также, если вы нашли ошибку или же у вас есть предложение по улучшению нашего проекта - будем только рады."
                        size="small"
                        smallPadding
                        buttonText="Обратиться"
                        href={process.env.NEXT_PUBLIC_VK_LINK}
                    />

                    <Block
                        title="Цветовая палитра сайта"
                        text="Мы можем вам предложить смену цвета сайта под ваши предпочтения. Также в профиле вы найдете много разных настроек, которые помогут сделать наш сайт для тебя комфортным и удобным, в общем, веселись в свое удовольствие!"
                        smallPadding
                        href="/personalization"
                        buttonText="Поменять цвет сайта"
                        icon={<Theme />}
                    />

                    <Block
                        title="Мессенджер"
                        text="Добавляйте в друзья, общайтесь сколько угодно, готовьтесь к экзаменам, задавайте вопросы и весело проводите время, все это в одном месте."
                        smallPadding
                        href="/messenger"
                        buttonText="Общаться"
                        icon={<Messenger />}
                    />
                </div>
            </div>
        </ContentWrapper>
    );
};

export default MainPage;
