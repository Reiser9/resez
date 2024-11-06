import { Dayjs } from 'dayjs';
import moment from 'moment-timezone';

export const isDateTimePast = (date?: Dayjs | null, time?: Dayjs | null) => {
    if (!date || !time) {
        return;
    }

    const dateFormat = date.format('YYYY-MM-DD');
    const timeFormat = time.format('HH:mm');

    const dateTime = moment(`${dateFormat} ${timeFormat}`, 'YYYY-MM-DD HH:mm');
    const currentDateTime = moment();

    return !dateTime.isBefore(currentDateTime);
};
