import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import "firebase/compat/auth";

import {user} from './auth-reducer.js';
import {patternNotify} from './notify-reducer.js';

const SET_DATA_IS_LOAD = 'SET_DATA_IS_LOAD';

const SET_POINT_TITLE = 'SET_POINT_TITLE';
const SET_POINT_SUBTITLE = 'SET_POINT_SUBTITLE';
const SET_POINT_ITEMS = 'SET_POINT_ITEMS';

const SET_STATUSES_IS_LOAD = 'SET_STATUSES';
const SET_STATUSES = 'SET_STATUSES';

const initialState = {
	// Загрузка данных
	dataIsLoad: false,
	// Преимущества
	pointTitle: '', //Заголовок
	pointSubtitle: '', //Подзаголовок
	pointItems: {}, //Блоки преимуществ,
	// Статусы
	statusesIsLoad: false,
	statuses: {}
}

const datasiteReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_DATA_IS_LOAD:
			return{
				...state,
				dataIsLoad: action.value
			}
		case SET_POINT_TITLE:
			return{
				...state,
				pointTitle: action.value
			}
		case SET_POINT_SUBTITLE:
			return{
				...state,
				pointSubtitle: action.value
			}
		case SET_POINT_ITEMS:
			return{
				...state,
				pointItems: action.value
			}
		case SET_STATUSES_IS_LOAD:
			return{
				...state,
				statusesIsLoad: action.value
			}
		case SET_STATUSES:
			return{
				...state,
				statuses: action.value
			}
        default:
            return state;
    }
}

const setDataIsLoad = (value) => {
	return{
		type: SET_DATA_IS_LOAD,
		value
	}
}
const setPointTitle = (value) => {
	return{
		type: SET_POINT_TITLE,
		value
	}
}
const setPointSubtitle = (value) => {
	return{
		type: SET_POINT_SUBTITLE,
		value
	}
}
const setPointItems = (value) => {
	return{
		type: SET_POINT_ITEMS,
		value
	}
}
const setStatusesIsLoad = (value) => {
	return{
		type: SET_STATUSES_IS_LOAD,
		value
	}
}
const setStatuses = (value) => {
	return{
		type: SET_STATUSES,
		value
	}
}

// Загрузка данных сайта
export const loadDataSite = () => async (dispatch) => {
	dispatch(setDataIsLoad(true));
	await firebase.database().ref('siteData').once('value', data => {
		dispatch(setDataIsLoad(false));
		dispatch(getAllStatuses());
		const {point} = data.val();
		dispatch(setPointTitle(point.title));
		dispatch(setPointSubtitle(point.subtitle));
		dispatch(setPointItems(point.items));
	});
}

// Смена цвета сайта
export const changeSitecolor = (color) => async (dispatch) => {
	await firebase.database().ref('users/' + user.uid + '/sitecolor').set(color).then(() => {
		dispatch(patternNotify('sitecolor_changed'));
	});
}

// Получение всех статусов сайта
export const getAllStatuses = () => async (dispatch) => {
	dispatch(setStatusesIsLoad(true));
	await firebase.database().ref('siteData/statusess').on('value', data => {
		dispatch(setStatusesIsLoad(false));
		let dataTemp = data.val();
		if(dataTemp === null){
			dataTemp = {}
		}
		dispatch(setStatuses(dataTemp));
	});
}

export default datasiteReducer;