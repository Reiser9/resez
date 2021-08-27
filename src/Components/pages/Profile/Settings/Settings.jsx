import React from 'react';
import {connect} from 'react-redux';

import './Settings.css';

import InputLocal from '../../../../common/Inputs/InputLocal/InputLocal.jsx';
import LoadButton from '../../../../common/Buttons/LoadButton/LoadButton.jsx';
import PreloaderFill from '../../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';

import {confirmEmail, editEmail, editPassword} from '../../../../redux/auth-reducer.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';
import {reqEmail, reqEditEmailLoad, reqVerificateEmail, reqEditPasswordLoad} from '../../../../redux/user-selectors.js';

const Settings = ({email, verificateEmail, editEmailLoad, editPasswordLoad, confirmEmail, editEmail, editPassword, patternNotify}) => {
	const [passwordEdit, setPasswordEdit] = React.useState(""); //Записываем измененный пароль
	const [confirmPasswordEdit, setConfirmPasswordEdit] = React.useState(""); //Записываем измененный повтор пароля
	const [emailEdit, setEmailEdit] = React.useState(""); //Записываем измененную почту

	const editEmailUser = () => {
		emailEdit !== email ? editEmail(emailEdit) : patternNotify('data_not_edit');
	}

	const editPasswordUser = () => {
		if(passwordEdit !== confirmPasswordEdit){
			patternNotify('compare_password');
		}
		else if(passwordEdit.length < 8){
			patternNotify('short_password');
		}
		else{
			editPassword(passwordEdit, setPasswordEdit, setConfirmPasswordEdit);
		}
	}

	if(!email){
		return <PreloaderFill />
	}

	return(
		<>
			<h2 className="pretitle w100">
				Настройки
			</h2>

			<div className="profile__settings--content w100">
				<div className="profile__settings--item flexstart">
					<p className="profile__settings--text">
						Смена пароля:
					</p>

					<InputLocal val="" editSetData={setPasswordEdit} editDataVal={passwordEdit} placeholder="Новый пароль" password={true} />

					<InputLocal val="" editSetData={setConfirmPasswordEdit} editDataVal={confirmPasswordEdit} placeholder="Новый пароль ещё раз" password={true} />

					{editPasswordLoad
					? <LoadButton margin="1" />
					: <button className="button profile__settings--button w100" onClick={editPasswordUser}>
						Сменить пароль
					</button>}
				</div>

				<div className="profile__settings--item flexstart">
					<p className="profile__settings--text">
						Адрес электронной почты:
					</p>

					<InputLocal val={email} editSetData={setEmailEdit} editDataVal={emailEdit} placeholder="Адрес электронной почты"/>

					{verificateEmail
					? <button className="button profile__settings--confirm w100 confirmed">
						Почта подтверждена
					</button>
					: <button className="button profile__settings--confirm w100 white__button" onClick={confirmEmail}>
						Подтвердить почту
					</button>}

					{editEmailLoad
					? <LoadButton margin="1" />
					: <button className="button profile__settings--button w100" onClick={editEmailUser}>
						Изменить
					</button>}
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		email: reqEmail(state),
		verificateEmail: reqVerificateEmail(state),
		editEmailLoad: reqEditEmailLoad(state),
		editPasswordLoad: reqEditPasswordLoad(state)
	}
}

export default connect(mapStateToProps, {confirmEmail, editEmail, editPassword, patternNotify})(Settings)