import moment from 'moment';
import 'moment/locale/ru';

export const formatDate = (date: Date, format = "D MMMM в HH:mm") => {
    if(!date){
        return date;
    }

    const formattedDate = moment(date).locale('ru').format(format);

    return formattedDate;
}