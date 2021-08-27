import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";
import '../firebase/firebaseConfig.js';

import {errorWrapper} from '../common/validate/validate.js';
import {patternNotify, setNotifyBase} from './notify-reducer.js';

export let user;

const SET_IS_AUTH = 'SET_IS_AUTH';
const SET_LOAD_AUTH = 'SET_LOAD_AUTH';
const SET_AUTH_IS_LOAD = 'SET_AUTH_IS_LOAD';
const SET_EDIT_NICK_LOAD = 'SET_EDIT_NICK_LOAD';
const SET_EDIT_EMAIL_LOAD = 'SET_EDIT_EMAIL_LOAD';
const SET_EDIT_PASSWORD_LOAD = 'SET_EDIT_PASSWORD_LOAD';

const SET_EMAIL_REGISTER = 'SET_EMAIL_REGISTER';
const SET_NICK_REGISTER = 'SET_NICK_REGISTER';
const SET_NAME_REGISTER = 'SET_NAME_REGISTER';
const SET_SURNAME_REGISTER = 'SET_SURNAME_REGISTER';
const SET_PASSWORD_REGISTER = 'SET_PASSWORD_REGISTER';
const SET_CONFIRM_PASSWORD_REGISTER = 'SET_CONFIRM_PASSWORD_REGISTER';

const SET_EMAIL_ENTER = 'SET_EMAIL_ENTER';
const SET_PASSWORD_ENTER = 'SET_PASSWORD_ENTER';

const SET_EMAIL_RECOVERY = 'SET_EMAIL_RECOVERY';

const SET_STATUS = 'SET_STATUS';
const SET_IMG = 'SET_IMG';
const SET_LVL = 'SET_LVL';
const SET_EXP = 'SET_EXP';
const SET_BALANCE = 'SET_BALANCE';
const SET_VERIFICATE_EMAIL = 'SET_VERIFICATE_EMAIL';
const SET_EMAIL = 'SET_EMAIL';
const SET_NICK = 'SET_NICK';
const SET_NAME = 'SET_NAME';
const SET_SURNAME = 'SET_SURNAME';
const SET_ROLE = 'SET_ROLE';
const SET_PRIVAT_PROFILE = 'SET_PRIVAT_PROFILE';
const SET_SITECOLOR = 'SET_SITECOLOR';

const SET_USERS = 'SET_USERS';
const SET_USERS_IN_LOAD = 'SET_USERS_IN_LOAD';

const initialState = {
    isAuth: false, //Авторизованы ли мы
    loadAuth: true, //Загрузка авторизации
    authIsLoad: false, //При нажатии Вход, Регистрация, Восстановление пароля происходит загрузка
    editNickLoad: false, // Загрузка смены ника
    editEmailLoad: false, // Загрузка смены почты
    editPasswordLoad: false, // Загрузка смены пароля
    // Данные для регистрации
    emailRegister: '', //Почта при регистрации
    nickRegister: '', //Ник при регистрации
    nameRegister: '', //Имя при регистрации
    surnameRegister: '', //Фамилия при регистрации
    passwordRegister: '', //Пароль при регистарции
    confirmPasswordRegister: '', //Пароль еще раз при регистрации
    // Данные для входа
    emailEnter: '', //Почта для входа
    passwordEnter: '', //Пароль для входа
    // Почта восстановления
    emailRecovery: '', //Почта для восстановления
    // Данные пользователя
    status: '', //Статус
    img: '', //Аватарка
    lvl: '', //Уровень
    exp: '', //Опыт
    balance: '', //Баланс
    verificateEmail: false, //Подтверждена ли почта
    email: '', //Почта
    nick: '', //Ник/Логин
    name: '', //Имя
    surname: '', //Фамилия
    role: '', //Роль
    privatProfile: false,
    sitecolor: '',
    // Прочие данные
    users: {},
    usersInLoad: true,
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_IS_AUTH:
            return{
                ...state,
                isAuth: action.value
            }
        case SET_LOAD_AUTH:
            return{
                ...state,
                loadAuth: action.value
            }
        case SET_AUTH_IS_LOAD:
            return{
                ...state,
                authIsLoad: action.value
            }
        case SET_EDIT_NICK_LOAD:
            return{
                ...state,
                editNickLoad: action.value
            }
        case SET_EDIT_EMAIL_LOAD:
            return{
                ...state,
                editEmailLoad: action.value
            }
        case SET_EDIT_PASSWORD_LOAD:
            return{
                ...state,
                editPasswordLoad: action.value
            }
        case SET_EMAIL_REGISTER:
            return{
                ...state,
                emailRegister: action.value
            }
        case SET_NICK_REGISTER:
            return{
                ...state,
                nickRegister: action.value
            }
        case SET_NAME_REGISTER:
            return{
                ...state,
                nameRegister: action.value
            }
        case SET_SURNAME_REGISTER:
            return{
                ...state,
                surnameRegister: action.value
            }
        case SET_PASSWORD_REGISTER:
            return{
                ...state,
                passwordRegister: action.value
            }
        case SET_CONFIRM_PASSWORD_REGISTER:
            return{
                ...state,
                confirmPasswordRegister: action.value
            }
        case SET_EMAIL_ENTER:
            return{
                ...state,
                emailEnter: action.value
            }
        case SET_PASSWORD_ENTER:
            return{
                ...state,
                passwordEnter: action.value
            }
        case SET_EMAIL_RECOVERY:
            return{
                ...state,
                emailRecovery: action.value
            }
        case SET_STATUS:
            return{
                ...state,
                status: action.value
            }
        case SET_IMG:
            return{
                ...state,
                img: action.value
            }
        case SET_LVL:
            return{
                ...state,
                lvl: action.value
            }
        case SET_EXP:
            return{
                ...state,
                exp: action.value
            }
        case SET_BALANCE:
            return{
                ...state,
                balance: action.value
            }
        case SET_VERIFICATE_EMAIL:
            return{
                ...state,
                verificateEmail: action.value
            }
        case SET_EMAIL:
            return{
                ...state,
                email: action.value
            }
        case SET_NICK:
            return{
                ...state,
                nick: action.value
            }
        case SET_NAME:
            return{
                ...state,
                name: action.value
            }
        case SET_SURNAME:
            return{
                ...state,
                surname: action.value
            }
        case SET_ROLE:
            return{
                ...state,
                role: action.value
            }
        case SET_PRIVAT_PROFILE:
            return{
                ...state,
                privatProfile: action.value
            }
        case SET_SITECOLOR:
            return{
                ...state,
                sitecolor: action.value
            }
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
        default:
            return state;
    }
}

export const setIsAuth = (value) => {
    return{
        type: SET_IS_AUTH,
        value
    }
}
export const setLoadAuth = (value) => {
    return{
        type: SET_LOAD_AUTH,
        value
    }
}
export const setAuthIsLoad = (value) => {
    return{
        type: SET_AUTH_IS_LOAD,
        value
    }
}
export const setEditNickLoad = (value) => {
    return{
        type: SET_EDIT_NICK_LOAD,
        value
    }
}
export const setEditEmailLoad = (value) => {
    return{
        type: SET_EDIT_EMAIL_LOAD,
        value
    }
}
export const setEditPasswordLoad = (value) => {
    return{
        type: SET_EDIT_PASSWORD_LOAD,
        value
    }
} 
export const setEmailRegister = (value) => {
    return{
        type: SET_EMAIL_REGISTER,
        value
    }
}
export const setNickRegister = (value) => {
    return{
        type: SET_NICK_REGISTER,
        value
    }
}
export const setNameRegister = (value) => {
    return{
        type: SET_NAME_REGISTER,
        value
    }
}
export const setSurnameRegister = (value) => {
    return{
        type: SET_SURNAME_REGISTER,
        value
    }
}
export const setPasswordRegister = (value) => {
    return{
        type: SET_PASSWORD_REGISTER,
        value
    }
}
export const setConfirmPasswordRegister = (value) => {
    return{
        type: SET_CONFIRM_PASSWORD_REGISTER,
        value
    }
}
export const setEmailEnter = (value) => {
    return{
        type: SET_EMAIL_ENTER,
        value
    }
}
export const setPasswordEnter = (value) => {
    return{
        type: SET_PASSWORD_ENTER,
        value
    }
}
export const setEmailRecovery = (value) => {
    return{
        type: SET_EMAIL_RECOVERY,
        value
    }
}
export const setStatus = (value) => {
    return{
        type: SET_STATUS,
        value
    }
}
export const setImg = (value) => {
    return{
        type: SET_IMG,
        value
    }
}
export const setLvl = (value) => {
    return{
        type: SET_LVL,
        value
    }
}
export const setExp = (value) => {
    return{
        type: SET_EXP,
        value
    }
}
export const setBalance = (value) => {
    return{
        type: SET_BALANCE,
        value
    }
}
export const setVerificateEmail = (value) => {
    return{
        type: SET_VERIFICATE_EMAIL,
        value
    }
}
export const setEmail = (value) => {
    return{
        type: SET_EMAIL,
        value
    }
}
export const setNick = (value) => {
    return{
        type: SET_NICK,
        value
    }
}
export const setName = (value) => {
    return{
        type: SET_NAME,
        value
    }
}
export const setSurname = (value) => {
    return{
        type: SET_SURNAME,
        value
    }
}
export const setRole = (value) => {
    return{
        type: SET_ROLE,
        value
    }
}
export const setPrivatProfile = (value) => {
    return{
        type: SET_PRIVAT_PROFILE,
        value
    }
}
export const setSitecolor = (value) => {
    return{
        type: SET_SITECOLOR,
        value
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

// Изменение данных в input
export const setData = (id, value) => (dispatch) => {
    switch(id){
        case 'emailRegister':
            dispatch(setEmailRegister(value));
            break;
        case 'nickRegister':
            dispatch(setNickRegister(value));
            break;
        case 'nameRegister':
            dispatch(setNameRegister(value));
            break;
        case 'surnameRegister':
            dispatch(setSurnameRegister(value));
            break;
        case 'passwordRegister':
            dispatch(setPasswordRegister(value));
            break;
        case 'confirmPasswordRegister':
            dispatch(setConfirmPasswordRegister(value));
            break;
        case 'emailEnter':
            dispatch(setEmailEnter(value));
            break;
        case 'passwordEnter':
            dispatch(setPasswordEnter(value));
            break;
        case 'emailRecovery':
            dispatch(setEmailRecovery(value));
            break;
        default:
            break;
    }
}

// Удаление текста внутри input по нажатию на крестик
export const setDataRemove = (id, value) => (dispatch) => {
    switch(id){
        case 'emailRegisterRemove':
            dispatch(setEmailRegister(value));
            break;
        case 'nickRegisterRemove':
            dispatch(setNickRegister(value));
            break;
        case 'nameRegisterRemove':
            dispatch(setNameRegister(value));
            break;
        case 'surnameRegisterRemove':
            dispatch(setSurnameRegister(value));
            break;
        case 'passwordRegisterRemove':
            dispatch(setPasswordRegister(value));
            break;
        case 'confirmPasswordRegisterRemove':
            dispatch(setConfirmPasswordRegister(value));
            break;
        case 'emailEnterRemove':
            dispatch(setEmailEnter(value));
            break;
        case 'passwordEnterRemove':
            dispatch(setPasswordEnter(value));
            break;
        case 'emailRecoveryRemove':
            dispatch(setEmailRecovery(value));
            break;
        default:
            break;
    }
}

// Следим за состоянием авторизации
export const authStateListener = () => async (dispatch) => {
    await firebase.auth().onAuthStateChanged((data) => {
        user = firebase.auth().currentUser;
        if(user){
            dispatch(loadUserData());
            dispatch(setIsAuth(true));
            verificateEmailSucces();
        }
        else{
            dispatch(setIsAuth(false));
        }
        dispatch(setLoadAuth(false));
    });
}

// Инициализация всех данных о пользователе
const loadUserData = () => async (dispatch) => {
    await firebase.database().ref('users/' + user.uid).on('value', data => {
        const dataVal = data.val();
        if(dataVal == null){
            dispatch(quitUser());
            return;
        }
        dispatch(setStatus(dataVal.status));
        dispatch(setName(dataVal.name));
        dispatch(setSurname(dataVal.surname));
        dispatch(setImg(dataVal.img));
        dispatch(setLvl(dataVal.lvl));
        dispatch(setExp(dataVal.exp));
        dispatch(setBalance(dataVal.balance));
        dispatch(setNick(dataVal.nick));
        dispatch(setVerificateEmail(dataVal.verificateEmail));
        dispatch(setEmail(dataVal.email));
        dispatch(setRole(dataVal.role));
        dispatch(setPrivatProfile(dataVal.privatProfile));
        dispatch(setNotifyBase(dataVal.notify));
        dispatch(setSitecolor(dataVal.sitecolor));
    });
}

// Получение всех пользователей
export const getUsers = () => (dispatch) => {
    firebase.database().ref('users').on('value', snapshot => {
        dispatch(setUsersInLoad(false));
        if(snapshot.val() !== null){
            dispatch(setUsers(snapshot.val()));
        }
    });
}

// Регистрация нового аккаунта
export const registerUser = (email, password, nick, name, surname) => (dispatch) => {
    dispatch(setAuthIsLoad(true));

    firebase.database().ref('nicks/' + nick).once('value', data => {
        if(data.val() !== null){
            dispatch(setAuthIsLoad(false));
            errorWrapper('nickRegister', 'Данный логин уже занят');
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(email, password).then((snapshot) => {
                dispatch(setAuthIsLoad(false));

                snapshot.user.updateProfile({
                    displayName: nick
                });

                firebase.database().ref('users/' + snapshot.user.uid).set({
                    uid: snapshot.user.uid,
                    name: name,
                    surname: surname,
                    email: email,
                    nick: nick,
                    lvl: 1,
                    exp: 0,
                    balance: 0,
                    verificateEmail: false,
                    status: 'Новичок',
                    img: '',
                    role: 'user',
                    privatProfile: false
                });

                firebase.database().ref('nicks/' + nick).set({
                    nick: nick,
                    uid: snapshot.user.uid
                });

                dispatch(clearInput());
                dispatch(patternNotify('register_account'));
            }).catch((error) => {
                dispatch(setAuthIsLoad(false));
                console.log(error.code);
                errorCatch(error.code, 'auth/email-already-in-use', 'emailRegister', 'Адрес электронной почты уже зарегистрирован');
            });
        }
    });
}

// Проверка занятости логина
export const checkAlreadyNick = (prevNick, nick) => (dispatch) => {
    dispatch(setEditNickLoad(true));
    firebase.database().ref('nicks/' + nick).once('value', data => {
        if(data.val() !== null){
            dispatch(setEditNickLoad(false));
            dispatch(patternNotify('nick_is_already_used'));
        }
        else{
            dispatch(setEditNickLoad(false));
            user.updateProfile({
                displayName: nick
            });

            firebase.database().ref('users/' + user.uid + '/nick').set(nick);
            firebase.database().ref('nicks/' + nick).set({
                nick,
                uid: user.uid
            });
            firebase.database().ref('nicks/' + prevNick).set({});
            dispatch(patternNotify('nick_edied'));
            debugger;
        }
    });
}

// Вход пользователя в аккаунт
export const enterUser = (email, password) => async (dispatch) => {
    dispatch(setAuthIsLoad(true));
    await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
        dispatch(setAuthIsLoad(false));
        dispatch(clearInput());
        dispatch(patternNotify('enter_account'));
    }).catch((error) => {
        dispatch(setAuthIsLoad(false));
        console.log(error.code);
        errorCatch(error.code, 'auth/user-not-found', 'emailEnter', 'Неверный адрес электронной почты или пароль');
        errorCatch(error.code, 'auth/wrong-password', 'emailEnter', 'Неверный адрес электронной почты или пароль');
        errorCatch(error.code, 'auth/too-many-requests', 'allErrors', 'Слишком много запросов, попробуйте позже');
    });
}

// Восстановить пароль
export const recoveryPassword = (email) => async (dispatch) => {
    dispatch(setAuthIsLoad(true));
    await firebase.auth().sendPasswordResetEmail(email).then(() => {
        dispatch(setAuthIsLoad(false));
        dispatch(clearInput());
        dispatch(patternNotify('recovery_password'));
    }).catch((error) => {
        dispatch(setAuthIsLoad(false));
        console.log(error.code);
        errorCatch(error.code, 'auth/user-not-found', 'emailRecovery', 'Пользователь с таким адресом электронной почты не найден');
    });
}

// Сменить пароль
export const editPassword = (password, setPassword, setConfirmPassword) => async (dispatch) => {
    dispatch(setEditPasswordLoad(true));
    await user.updatePassword(password).then(function() {
        dispatch(setEditPasswordLoad(false));
        dispatch(patternNotify('password_edit'));
        setPassword('');
        setConfirmPassword('');
    }).catch(() => {
        dispatch(setEditPasswordLoad(false));
        dispatch(patternNotify('auth_again'));
        dispatch(quitUser());
    });
}

// Подтвердить почту
export const confirmEmail = () => async (dispatch) => {
    await user.sendEmailVerification().then(function() {
        dispatch(patternNotify('send_verificate_message'));
    }).catch(() => {
        dispatch(patternNotify('error_verificate_email'));
    });
}

// Сменить почту
export const editEmail = (email) => async (dispatch) => {
    dispatch(setEditEmailLoad(true));
    await user.updateEmail(email).then(function(){
        dispatch(setEditEmailLoad(false));
        dispatch(updateDataUser('email', email));
        dispatch(setVerificateEmail(false));
        dispatch(patternNotify('success_edit_email'));
    }).catch((err) => {
        dispatch(setEditEmailLoad(false));
        switch(err.code){
            case 'auth/requires-recent-login':
                dispatch(patternNotify('auth_again'));
                dispatch(quitUser());
                break;
            case 'auth/invalid-email':
                dispatch(patternNotify('invalid_email'));
                break;
            case 'auth/email-already-in-use':
                dispatch(patternNotify('email_is_already_used'));
                break;
            default:
                break;
        }
    });
}

// Записываем верификацию email в бд
export const verificateEmailSucces = async () => {
    let verEmail = user.emailVerified;
    await firebase.database().ref('users/' + user.uid).update({
        verificateEmail: verEmail
    });
}

// Выход пользователя с аккаунта
export const quitUser = (pattern = false) => async (dispatch) => {
    await firebase.auth().signOut().then(() => {
        dispatch(clearRedux());
        pattern && dispatch(patternNotify('quit_account'));
    }).catch((error) => {
        console.log(error.code);
    });
}

// Удалить аккаунт
export const deleteAccount = () => (dispatch) => {
    user.delete().then(() => {
        dispatch(clearRedux());
        firebase.database().ref('users/' + user.uid).set({});
        firebase.database().ref('nicks/' + user.displayName).set({});
        dispatch(patternNotify('delete_account'));
    }).catch((error) => {
        console.log(error.code);
    });
}

// Изменить какое-то поле пользователя, передаем название поля, к примеру nick, значение и uid пользователя, которому нужно что-то поменять
export const updateDataUser = (id, value) => async (dispatch) => {
    await firebase.database().ref('users/' + user.uid).update({
        [id]: value
    });
}

// Редактируем данные в базе данных
export const editUserDataInDatabase = (name, value) => async (dispatch) => {
    await firebase.database().ref('users/' + user.uid + "/" + name).set(value);
}

// Очищаем redux после выхода с аккаунта, дабы не произошли баги, будто мы авторизованы
const clearRedux = () => (dispatch) => {
    dispatch(setStatus(''));
    dispatch(setImg(''));
    dispatch(setLvl(''));
    dispatch(setExp(''));
    dispatch(setBalance(''));
    dispatch(setVerificateEmail(false));
    dispatch(setEmail(''));
    dispatch(setNick(''));
    dispatch(setName(''));
    dispatch(setSurname(''));
    dispatch(setRole(''));
    dispatch(setPrivatProfile(false));
    dispatch(setNotifyBase({}));
    dispatch(setSitecolor(''));
}

// Очистить все поля input
const clearInput = () => (dispatch) => {
    inputEmpty(['emailRegister', 'nickRegister', 'passwordRegister', 'confirmPasswordRegister', 'emailEnter', 'passwordEnter', 'emailRecovery'], dispatch);
}

// После удачного входа, обнуляем значения полей
const inputEmpty = (arr, dispatch) => {
    for(let i = 0; i < arr.length; i++){
        dispatch(setData(arr[i], ''));
    }
}

// Функция обертки полей с ошибками, передаем ошибку, код ошибки, id поля и текст, который хотим увидеть на ошибке(поля авторизации, регистрации)
const errorCatch = (error, errorCode, id, text) => {
    if(error === errorCode){errorWrapper(id, text)}
}

// Сравнить элемент с массивом, позвращает истину, если такое элемент есть
export const compareData = (compare, array) => {
    let alreadyUse = false;
    let allUsers = Object.keys(array).map((key) => {
        return array[key]
    });

    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].nick.toLowerCase() === compare.toLowerCase()){
            alreadyUse = true;
            break;
        }
    }

    return alreadyUse;
}

export default authReducer;