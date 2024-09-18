'use client';

import React from 'react';
import { useSwipeable, SwipeableHandlers } from 'react-swipeable';
import cn from 'classnames';

import styles from './index.module.scss';

import CardPart from './CardPart';

type Position = {
    x: number;
    y: number;
    rotate: number;
};

const offsetTranslateCard = 100;

type Props = {
    data: {
        questionText: string;
        questionPicture: string;
        answerText: string;
        answerPicture: string;
    };
    wrongText?: string;
    correctText?: string;
    active?: boolean;
    prev?: boolean;
    correctCallback?: () => void;
    wrongCallback?: () => void;
    positive: boolean;
};

const Card: React.FC<Props> = ({
    data,
    wrongText = 'Не знаю',
    correctText = 'Знаю',
    active = false,
    prev = false,
    correctCallback = () => {},
    wrongCallback = () => {},
    positive,
}) => {
    const [rotate, setRotate] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isSwipingInClick, setIsSwipingInClick] = React.useState(false);
    const [position, setPosition] = React.useState<Position>({ x: 0, y: 0, rotate: 0 });
    const [correct, setCorrect] = React.useState(0);
    const [wrong, setWrong] = React.useState(0);

    const clearCard = () => {
        setPosition({
            x: 0,
            y: 0,
            rotate: 0,
        });

        setIsDragging(false);
        setCorrect(0);
        setWrong(0);
    };

    const handlers: SwipeableHandlers = useSwipeable({
        onSwipeStart: () => {
            setIsDragging(true);
        },
        onSwiping: (data) => {
            const { deltaX, deltaY } = data;

            setPosition({
                x: deltaX,
                y: deltaY,
                rotate: deltaX / 18,
            });

            setIsSwipingInClick(true);

            if (deltaX > 0) {
                setCorrect(deltaX > offsetTranslateCard ? 1 : deltaX / offsetTranslateCard);
                setWrong(0);
            } else {
                setWrong(deltaX < -offsetTranslateCard ? 1 : -deltaX / offsetTranslateCard);
                setCorrect(0);
            }
        },
        onSwiped: (data) => {
            const { deltaX } = data;

            if (deltaX > offsetTranslateCard) {
                correctCallback();
                speechSynthesis.cancel();
            } else if (deltaX < -offsetTranslateCard) {
                wrongCallback();
                speechSynthesis.cancel();
            }

            setTimeout(() => {
                setIsSwipingInClick(false);
            }, 100);

            clearCard();
        },
        onTouchEndOrOnMouseUp: () => {
            clearCard();
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const myRef = React.useRef<HTMLDivElement>();

    const refPassthrough = (el: HTMLDivElement) => {
        handlers.ref(el);

        myRef.current = el;
    };

    const { questionText, questionPicture, answerText, answerPicture } = data || {};

    React.useEffect(() => {
        const handleBeforeUnload = () => {
            speechSynthesis.cancel();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            handleBeforeUnload();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <div
            className={cn(styles.card, {
                [styles.active]: active,
                [styles.cardTransition]: !isDragging,
                [styles.rotate]: rotate,
                [styles.swipeRight]: prev && positive,
                [styles.swipeLeft]: prev && !positive,
            })}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                transform: `rotate(${position.rotate}deg) perspective(600px)${rotate ? ' rotateY(180deg)' : ''}`,
                userSelect: 'none',
                cursor: 'grab',
            }}
            onClick={() => {
                if (!isSwipingInClick) {
                    setRotate((prev) => !prev);
                }
            }}
            {...handlers}
            ref={refPassthrough}
        >
            <CardPart text={questionText} image={questionPicture} className={styles.front} />
            <CardPart text={answerText} image={answerPicture} className={styles.back} />

            <div
                className={cn(styles.verdict, styles.wrong, {
                    [styles.cardTransition]: !isDragging,
                })}
                style={{ opacity: wrong }}
            >
                {wrongText}
            </div>
            <div
                className={cn(styles.verdict, styles.correct, {
                    [styles.cardTransition]: !isDragging,
                })}
                style={{ opacity: correct }}
            >
                {correctText}
            </div>
        </div>
    );
};

export default Card;
