import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";

import {user} from './auth-reducer.js'

const SET_NOTIFY = 'SET_NOTIFY';
const SET_NOTIFY_BASE = 'SET_NOTIFY_BASE';
const SET_REMOVE_NOTIFY = 'SET_REMOVE_NOTIFY';
const SET_READ_NOTIFY_LOAD = 'SET_READ_NOTIFY_LOAD';
const SET_NOTIFY_NOT_READ = 'SET_NOTIFY_NOT_READ';

const initialState = {
	notify: {},
	notifyBase: {},
	readNotifyLoad: false,
	notifyNotRead: 0
}

const notifyReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_NOTIFY:
			return{
				...state,
				notify: {
					...state.notify,
					...action.value
				}
			}
		case SET_NOTIFY_BASE:
			return{
				...state,
				notifyBase: action.value
			}
		case SET_REMOVE_NOTIFY:
			let removedObj = {
				...state.notify
			}
			delete removedObj[action.value];
			return{
				...state,
				notify: removedObj
			}
		case SET_READ_NOTIFY_LOAD:
			return{
				...state,
				readNotifyLoad: action.value
			}
		case SET_NOTIFY_NOT_READ:
			return{
				...state,
				notifyNotRead: action.value
			}
        default:
            return state;
    }
}

const setNotify = (value) => {
	return{
		type: SET_NOTIFY,
		value
	}
}
export const setNotifyBase = (value) => {
	return{
		type: SET_NOTIFY_BASE,
		value
	}
}
const setRemoveNotify = (value) => {
	return{
		type: SET_REMOVE_NOTIFY,
		value
	}
}
const setReadNotifyLoad = (value) => {
	return{
		type: SET_READ_NOTIFY_LOAD,
		value
	}
}
export const setNotifyNotRead = (value) => {
	return{
		type: SET_NOTIFY_NOT_READ,
		value
	}
}

// Получить время в секундах
export const getTimeId = () => {
	let time = new Date();
	return time.getTime();
}

// Получить дату в формате DD.MM.YYYY
export const getTimeNormal = () => {
	let time = new Date();
	let day = time.getDate();
	let month = time.getMonth() + 1;
	let year = time.getFullYear();
	if(day < 10){
		day = '0' + day;
	}
	if(month < 10){
		month = '0' + month;
	}
	return day + "." + month + "." + year;
}

// Добавить уведомление
export const addNotify = (title, text, type) => (dispatch) => {
	let id = getTimeId();
	let tempObject = {
		[id]: {
			title,
			text,
			type,
			id
		}
	}
	dispatch(setNotify(tempObject));
}

// Добавить уведомление всем пользователям
export const addNotifyAll = (title, text) => async (dispatch) => {
	await firebase.database().ref('users').once('value', val => {
		let id = getTimeId();
		let tempObject = {
			[id]: {
				title,
				text,
				read: false,
				date: getTimeNormal(),
				id
			}
		}

		for(let i in val.val()){
			firebase.database().ref('users/' + val.val()[i].uid + '/notify').update(tempObject);
		}
		dispatch(patternNotify('notify_added'));
	});
}

// Добавить уведомление определенному пользователю
export const addNotifyForOneUser = (title, text, uid = user.uid) => async (dispatch) => {
	let id = getTimeId();
	let tempObject = {
		[id]: {
			title,
			text,
			read: false,
			date: getTimeNormal(),
			id
		}
	}

	await firebase.database().ref('users/' + uid + '/notify').update(tempObject).then(() => {
		dispatch(patternNotify('notify_added'));
	});
}

// Удалить уведомление
export const removeNotify = (id) => (dispatch) => {
	dispatch(setRemoveNotify(id));
}

// Прочитать уведомление пользователя
export const readNotifyUser = (id) => async (dispatch) => {
	dispatch(setReadNotifyLoad(true));
	await firebase.database().ref('users/' + user.uid + '/notify/' + id + '/read').set(true).then(() => {
		dispatch(setReadNotifyLoad(false));
	});
}

// Выбор уведомления, вводим id
export const patternNotify = (id) => (dispatch) => {
	switch(id){
		case 'quit_account':
			dispatch(addNotify('Успешно!', 'Вы вышли с аккаунта!', 'success'));
			break;
		case 'recovery_password':
			dispatch(addNotify('Успешно!', 'Письмо с восстановлением отправлено!', 'success'));
			break;
		case 'register_account':
			dispatch(addNotify('Успешно!', 'Регистрация успешно завершена!', 'success'));
			break;
		case 'enter_account':
			dispatch(addNotify('Успешно!', 'Вы вошли в аккаунт!', 'success'));
			break;
		case 'delete_account':
			dispatch(addNotify('Успешно!', 'Ваш аккаунт удален!', 'success'));
			break;
		case 'data_not_edit':
			dispatch(addNotify('Информация!', 'Данные никак не изменились!', 'info'));
			break;
		case 'name_edied':
			dispatch(addNotify('Успешно!', 'Имя изменено!', 'success'));
			break;
		case 'surname_edied':
			dispatch(addNotify('Успешно!', 'Фамилия изменена!', 'success'));
			break;
		case 'nick_edied':
			dispatch(addNotify('Успешно!', 'Логин изменён!', 'success'));
			break;
		case 'name_empty_or_long':
			dispatch(addNotify('Ошибка!', 'Имя не может быть пустым или длиннее 50 символов!', 'error'));
			break;
		case 'surname_empty_or_long':
			dispatch(addNotify('Ошибка!', 'Фамилия не может быть пустой или длиннее 50 символов!', 'error'));
			break;
		case 'nick_empty_or_long':
			dispatch(addNotify('Ошибка!', 'Логин не может быть пустым или длиннее 50 символов!', 'error'));
			break;
		case 'nick_is_already_used':
			dispatch(addNotify('Ошибка!', 'Данный логин уже занят', 'error'));
			break;
		case 'send_verificate_message':
			dispatch(addNotify('Успешно!', 'Письмо отправлено вам на почту!', 'success'));
			break;
		case 'error_verificate_email':
			dispatch(addNotify('Ошибка!', 'Произошла ошибка при отправке сообщения!', 'error'));
			break;
		case 'auth_again':
			dispatch(addNotify('Внимание!', 'В целях безопасности авторизируйтесь еще раз!', 'warn'));
			break;
		case 'invalid_email':
			dispatch(addNotify('Ошибка!', 'Некорректный адрес электройнной почты!', 'error'));
			break;
		case 'success_edit_email':
			dispatch(addNotify('Успешно!', 'Адрес электронной почты для данного аккаунта изменён!', 'success'));
			break;
		case 'email_is_already_used':
			dispatch(addNotify('Ошибка!', 'Данный адрес электронной почты уже используется!', 'error'));
			break;
		case 'password_edit':
			dispatch(addNotify('Успешно!', 'Пароль изменён!', 'success'));
			break;
		case 'compare_password':
			dispatch(addNotify('Ошибка!', 'Пароли не совпадают!', 'error'));
			break;
		case 'short_password':
			dispatch(addNotify('Ошибка!', 'Пароль не может быть меньше 8 символов!', 'error'));
			break;
		case 'sitecolor_changed':
			dispatch(addNotify('Успешно!', 'Цветовая палитра сайта изменена!', 'success'));
			break;
		case 'notify_added':
			dispatch(addNotify('Успешно!', 'Уведомление добавлено!', 'success'));
			break;
		case 'title_empty':
			dispatch(addNotify('Ошибка!', 'Заголовок не должен быть пустым!', 'error'));
			break;
		case 'text_empty':
			dispatch(addNotify('Ошибка!', 'Текст не должен быть пустым!', 'error'));
			break;
		case 'wrong_confirm_word':
			dispatch(addNotify('Ошибка!', 'Неверно введен текст подтверждения действия', 'error'));
			break;
		case 'many_requests':
			dispatch(addNotify('Внимание!', 'Проверка google recaptcha не пройдена, попробуйте позже', 'warn'));
			break;
		case 'data_changed':
			dispatch(addNotify('Успешно!', 'Данные успешно изменены', 'success'));
			break;
		case 'user_baned':
			dispatch(addNotify('Успешно!', 'Пользователь заблокирован', 'success'));
			break;
		case 'user_unbaned':
			dispatch(addNotify('Успешно!', 'Пользователь разблокирован', 'success'));
			break;
		default:
			break;
	}
}

export default notifyReducer;