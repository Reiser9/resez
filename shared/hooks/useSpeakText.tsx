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

            const handleStart = () => {
                setIsSpeaking(true);
            };

            const handleEnd = () => {
                setIsSpeaking(false);
            };

            const handleError = () => {
                setIsSpeaking(false);
            };

            newSpeech.addEventListener('start', handleStart);
            newSpeech.addEventListener('end', handleEnd);
            newSpeech.addEventListener('error', handleError);

            speechSynthesis.speak(newSpeech);

            return () => {
                newSpeech.removeEventListener('start', handleStart);
                newSpeech.removeEventListener('end', handleEnd);
                newSpeech.removeEventListener('error', handleError);
            };
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
