import { CORRECT_PHRASES, WRONG_PHRASES } from '../consts/PHRASES';

export const generateWrongPhrase = () => {
    let rand = 0 + Math.random() * (WRONG_PHRASES.length - 0);

    return WRONG_PHRASES[Math.round(rand)];
};

export const generateCorrectPhrase = () => {
    let rand = 0 + Math.random() * (CORRECT_PHRASES.length - 0);

    return CORRECT_PHRASES[Math.round(rand)];
};
