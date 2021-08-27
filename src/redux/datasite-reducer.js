import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";

import {user} from './auth-reducer.js';
import {patternNotify} from './notify-reducer.js';

const SET_DATA_IS_LOAD = 'SET_DATA_IS_LOAD';

const SET_POINT_TITLE = 'SET_POINT_TITLE';
const SET_POINT_SUBTITLE = 'SET_POINT_SUBTITLE';
const SET_POINT_ITEMS = 'SET_POINT_ITEMS';

const SET_SITECOLORS = 'SET_SITECOLORS';

const initialState = {
	// Загрузка данных
	dataIsLoad: true,
	// Преимущества
	pointTitle: '', //Заголовок
	pointSubtitle: '', //Подзаголовок
	pointItems: {}, //Блоки преимуществ
	// Цвета на сайте
	sitecolors: {}
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
		case SET_SITECOLORS:
			return{
				...state,
				sitecolors: action.value
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
const setSitecolors = (value) => {
	return{
		type: SET_SITECOLORS,
		value
	}
}

// Загрузка данных сайта
export const loadDataSite = () => async (dispatch) => {
	await firebase.database().ref('siteData').on('value', data => {
		dispatch(setDataIsLoad(false));
		let dataVal = data.val();
		dispatch(setPointTitle(dataVal.point.title));
		dispatch(setPointSubtitle(dataVal.point.subtitle));
		dispatch(setPointItems(dataVal.point.items));
		dispatch(setSitecolors(dataVal.sitecolor));
	});
}

// Смена цвета сайта
export const changeSitecolor = (color) => async (dispatch) => {
	await firebase.database().ref('users/' + user.uid + '/sitecolor').set(color).then(() => {
		dispatch(patternNotify('sitecolor_changed'));
	});
}

export default datasiteReducer;