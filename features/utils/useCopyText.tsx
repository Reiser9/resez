'use client';

import useAlert from '@/shared/hooks/useAlert';
import { copyText } from '@/shared/utils/copyText';

const useCopyText = () => {
    const { alertNotify } = useAlert();

    const copyTextWithNotify = (text?: string, alertText = 'Текст скопирован'): void => {
        copyText(text);
        alertNotify('Успешно', alertText, 'success');
    };

    return {
        copyTextWithNotify,
    };
};

export default useCopyText;
