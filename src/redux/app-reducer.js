import {authStateListener} from './auth-reducer.js';
import {loadDataSite} from './datasite-reducer.js';

const SET_INIT_APP = 'SET_INIT_APP';

const initialState = {
	initApp: false
}

const appReducer = (state = initialState, action) => {
	switch(action.type){
		case SET_INIT_APP:
			return{
				...state,
				initApp: action.value
			}
        default:
            return state;
    }
}

const setInitApp = (value) => {
	return{
		type: SET_INIT_APP,
		value
	}
}

// Инициализация приложения
export const initializedApp = () => (dispatch) => {
	let auth = dispatch(authStateListener());
	let dataSite = dispatch(loadDataSite());

    Promise.all([auth, dataSite]).then(() => {
        dispatch(setInitApp(true));
    });
}

export default appReducer;