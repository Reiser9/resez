import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './Register.css';

import Logo from '../../../common/Logo/Logo.jsx';
import AuthPageWrapper from '../../../common/PageWrappers/AuthPageWrapper/AuthPageWrapper.jsx';
import Input from '../../../common/Inputs/Input/Input.jsx';
import LoadButton from '../../../common/Buttons/LoadButton/LoadButton.jsx';
import Button from '../../../common/Buttons/Button/Button.jsx';

import {registerValid} from '../../../common/validate/validate.js';
import {reqEmailRegister, reqNickRegister, reqPasswordRegister, reqConfirmPasswordRegister, reqAuthIsLoad, 
reqNameRegister, reqSurnameRegister} from '../../../redux/user-selectors.js';

const Register = ({registerUser, authIsLoad, emailRegister, nickRegister, nameRegister, surnameRegister,
 passwordRegister, confirmPasswordRegister, registerValid}) => {
	const register = () => {
		registerValid(emailRegister, nickRegister, nameRegister, surnameRegister, passwordRegister, confirmPasswordRegister);
	}

	return(
		<AuthPageWrapper>
			<div className="auth">
				<Logo />

				<div className="auth__wrapper">
					<div className="auth__inner">
						<div className="auth__img--inner">
							<img src="./assets/img/register.svg" alt="Вход" className="auth__img" />
						</div>

						<div className="auth__content register__field">
							<Input id="emailRegister" value={emailRegister} placeholder="Адрес электронной почты" />

							<Input id="nickRegister" value={nickRegister} placeholder="Логин" />

							<Input id="nameRegister" value={nameRegister} placeholder="Имя" />

							<Input id="surnameRegister" value={surnameRegister} placeholder="Фамилия" />

							<Input id="passwordRegister" value={passwordRegister} placeholder="Пароль" password={true} />

							<Input id="confirmPasswordRegister" value={confirmPasswordRegister} placeholder="Пароль ещё раз" password={true} />

							<div className="all__errors">

							</div>

							<p className="agree__text">
								Нажимая кнопку регистрация вы принимаете правила сервиса и пользовательское соглашение 
							</p>

							<div className="form__link--inner">
								<Link to={'/login'} className="form__link">
									Уже зарегистрированы?
								</Link>
							</div>

							{authIsLoad
							? <LoadButton />
							: <Button text={"Регистрация"} onClick={register} />}
						</div>
					</div>
				</div>
			</div>
		</AuthPageWrapper>
	)
}

const mapStateToProps = (state) => {
	return{
		authIsLoad: reqAuthIsLoad(state),
		emailRegister: reqEmailRegister(state),
		nickRegister: reqNickRegister(state),
		nameRegister: reqNameRegister(state),
		surnameRegister: reqSurnameRegister(state),
		passwordRegister: reqPasswordRegister(state),
		confirmPasswordRegister: reqConfirmPasswordRegister(state)
	}
}

export default connect(mapStateToProps, {registerValid})(Register);