import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {compose} from 'redux';
import appReducer from './app-reducer.js';
import authReducer from './auth-reducer.js';
import datasiteReducer from './datasite-reducer.js';
import notifyReducer from './notify-reducer.js';
import adminReducer from './admin-reducer.js';
import modalReducer from './modal-reducer.js';

const redusers = combineReducers({
	app: appReducer,
	auth: authReducer,
	datasite: datasiteReducer,
	notify: notifyReducer,
	admin: adminReducer,
	modal: modalReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;