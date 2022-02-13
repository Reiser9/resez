import $ from 'jquery';
import {enterUser, registerUser, recoveryPassword} from '../../redux/auth-reducer.js';

export const registerValid = (email, nick, name, surname, password, confirmPassword) => (dispatch) => {
	let registerErrors = {};
	errorDelete("register__field");
	if(nick.length < 3 || nick.length >= 24){registerErrors.nickRegister = 'Логин должен содержать минимум 3 и максимум 24 символа'}
	if(password.length < 8){registerErrors.passwordRegister = 'Пароль должен содержать минимум 8 символов'}
	if(password !== confirmPassword){registerErrors.confirmPasswordRegister = 'Пароли не совпадают'}
	if(!validMail(email)){registerErrors.emailRegister = 'Некорректный адрес электронной почты'}
	if(name.length < 1 || name.length > 50){registerErrors.nameRegister = 'Имя не может быть пустым или больше 50 символов'}
	if(surname.length < 1 || surname.length > 50){registerErrors.surnameRegister = 'Фамилия не может быть пустой или больше 50 символов'}

	if(Object.keys(registerErrors).length !== 0){
		errorFlux(registerErrors);
	}
	else{
		dispatch(registerUser(email, password, nick, name, surname));
	}
}

export const loginValid = (email, password) => (dispatch) => {
	let loginErrors = {};
	errorDelete("login__field");
	if(!validMail(email)){loginErrors.emailEnter = 'Некорректный адрес электронной почты'}
	if(password.length < 8){loginErrors.passwordEnter = 'Пароль не может быть меньше 8 символов'}

	if(Object.keys(loginErrors).length !== 0){
		errorFlux(loginErrors);
	}
	else{
		dispatch(enterUser(email, password));
	}
}

export const recoveryValid = (email) => (dispatch) => {
	let recoveryErrors = {};
	errorDelete("recovery__field");
	if(!validMail(email)){recoveryErrors.emailRecovery = 'Некорректный адрес электронной почты'}

	if(Object.keys(recoveryErrors).length !== 0){
		errorFlux(recoveryErrors);
	}
	else{
		dispatch(recoveryPassword(email));
	}
}

// Проверяет валидность почты
const validMail = (email) => {
	return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
}

// Проходит по массиву ошибок и оборачивает их
const errorFlux = (errors) => {
	let keys = Object.keys(errors);
	for(let i = 0; i < keys.length; i++){
		let id = keys[i];
		let error = errors[keys[i]];
		errorWrapper(id, error);
	}
	errors = {};
}

// Оборачивает ошибку input
export const errorWrapper = (id, error) => {
	if(id === 'allErrors'){
		$(".all__errors").children(".input__warn--text").remove();
		$(".all__errors").append("<p class='input__warn--text'>"+error+"</p>");
	}
	else{
		$("#"+id).addClass("warn");
		$("#"+id).parent(".input__wrapper").parent(".input__inner").append("<p class='input__warn--text'>"+error+"</p>");
	}
}

// Удаляет обертку ошибки input
const errorDelete = (field) => {
	$("."+field).children(".input__inner").children(".input__warn--text").remove();
	$("."+field).children(".input__inner").children(".input__wrapper").children("input").removeClass("warn");
}