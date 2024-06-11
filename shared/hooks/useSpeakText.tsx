<<<<<<< HEAD
import React from 'react';

const useSpeakText = () => {
    const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);

    const speakText = (text: string, rate = 1, pitch = 1) => {
        if (!text || text.trim() === '') {
            return;
        }

        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();

            const newSpeech = new SpeechSynthesisUtterance(text);
            newSpeech.rate = rate;
            newSpeech.pitch = pitch;

            speechSynthesis.speak(newSpeech);

            newSpeech.addEventListener('start', () => {
                setIsSpeaking(true);
            });

            newSpeech.addEventListener('end', () => {
                setIsSpeaking(false);
            });

            newSpeech.addEventListener('error', () => {
                setIsSpeaking(false);
            });
        } else {
            alert('Ваш браузер не поддерживает прослушивание текста');
        }
    };

    const clearSpeak = () => {
        setIsSpeaking(false);
        speechSynthesis.cancel();
    };

    const speakIsSupport = () => {
        return 'speechSynthesis' in window;
    };

    React.useEffect(() => {
        return () => {
            speechSynthesis.cancel();
        };
    }, []);

    return {
        isSpeaking,
        speakText,
        clearSpeak,
        speakIsSupport,
    };
};

export default useSpeakText;
=======
import React from 'react';

const useSpeakText = () => {
    const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);

    const speakText = (text: string, rate = 1, pitch = 1) => {
        if (!text || text.trim() === '') {
            return;
        }

        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();

            const newSpeech = new SpeechSynthesisUtterance(text);
            newSpeech.rate = rate;
            newSpeech.pitch = pitch;

            speechSynthesis.speak(newSpeech);

            newSpeech.addEventListener('start', () => {
                setIsSpeaking(true);
            });

            newSpeech.addEventListener('end', () => {
                setIsSpeaking(false);
            });

            newSpeech.addEventListener('error', () => {
                setIsSpeaking(false);
            });
        } else {
            alert('Ваш браузер не поддерживает прослушивание текста');
        }
    };

    const clearSpeak = () => {
        setIsSpeaking(false);
        speechSynthesis.cancel();
    };

    const speakIsSupport = () => {
        return 'speechSynthesis' in window;
    };

    React.useEffect(() => {
        return () => {
            speechSynthesis.cancel();
        };
    }, []);

    return {
        isSpeaking,
        speakText,
        clearSpeak,
        speakIsSupport,
    };
};

export default useSpeakText;
>>>>>>> c61da454dd30e7ca31637fe711cf5e35c92c2018
