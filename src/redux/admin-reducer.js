import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import '../firebase/firebaseConfig.js';

const SET_USERS = 'SET_USERS';
const SET_USERS_IN_LOAD = 'SET_USERS_IN_LOAD';
const SET_USERS_VALUE = 'SET_USERS_VALUE';

const initialState = {
    // Получение пользователей
    users: [],
    usersInLoad: false,
    usersValue: 0
}

const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USERS:
            return{
                ...state,
                users: action.value
            }
        case SET_USERS_IN_LOAD:
            return{
                ...state,
                usersInLoad: action.value
            }
        case SET_USERS_VALUE:
            return{
                ...state,
                usersValue: action.value
            }
        default:
            return state;
    }
}

export const setUsers = (value) => {
    return{
        type: SET_USERS,
        value
    }
}
export const setUsersInLoad = (value) => {
    return{
        type: SET_USERS_IN_LOAD,
        value
    }
}
export const setUsersValue = (value) => {
    return{
        type: SET_USERS_VALUE,
        value
    }
}

// Получение всех пользователей
export const getUsers = (limit = 5) => (dispatch) => {
    dispatch(setUsersInLoad(true));
    firebase.database().ref('users').limitToFirst(parseInt(limit)).once('value', snapshot => {
        dispatch(setUsersInLoad(false));
        if(snapshot.val() !== null){
            dispatch(setUsers(snapshot.val()));
        }
    });
}

// Получение числа всех пользователей
export const getUsersNumber = () => (dispatch) => {
    firebase.database().ref('siteData/usersValue').on('value', snapshot => {
        dispatch(setUsersValue(snapshot.val()));
    });
}

export default adminReducer;