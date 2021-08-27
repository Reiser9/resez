import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './Login.css';

import Logo from '../../../common/Logo/Logo.jsx';
import AuthPageWrapper from '../../../common/PageWrappers/AuthPageWrapper/AuthPageWrapper.jsx';
import Input from '../../../common/Inputs/Input/Input.jsx';
import LoadButton from '../../../common/Buttons/LoadButton/LoadButton.jsx';
import Button from '../../../common/Buttons/Button/Button.jsx';

import {loginValid} from '../../../common/validate/validate.js';
import {reqAuthIsLoad, reqEmailEnter, reqPasswordEnter} from '../../../redux/user-selectors.js';

const Login = ({emailEnter, passwordEnter, authIsLoad, loginValid}) => {
	const enter = () => {
		loginValid(emailEnter, passwordEnter);
	}

	return(
		<AuthPageWrapper>
			<div className="auth">
				<Logo />

				<div className="auth__wrapper">
					<div className="auth__inner">
						<div className="auth__img--inner">
							<img src="./assets/img/login.svg" alt="Вход" className="auth__img" />
						</div>

						<div className="auth__content login__field">
							<Input id="emailEnter" value={emailEnter} placeholder="Адрес электронной почты" />

							<Input id="passwordEnter" value={passwordEnter} placeholder="Пароль" password={true} />

							<div className="all__errors">

							</div>

							<div className="form__link--inner">
								<Link to={'/recovery'} className="form__link">
									Забыли пароль?
								</Link>

								<Link to={'/register'} className="form__link">
									Нет аккаунта?
								</Link>
							</div>

							{authIsLoad
							? <LoadButton />
							: <Button text={"Войти"} onClick={enter} />}
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
		emailEnter: reqEmailEnter(state),
		passwordEnter: reqPasswordEnter(state)
	}
}

export default connect(mapStateToProps, {loginValid})(Login);