import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './Recovery.css';

import Logo from '../../../common/Logo/Logo.jsx';
import AuthPageWrapper from '../../../common/PageWrappers/AuthPageWrapper/AuthPageWrapper.jsx';
import Input from '../../../common/Inputs/Input/Input.jsx';
import LoadButton from '../../../common/Buttons/LoadButton/LoadButton.jsx';
import Button from '../../../common/Buttons/Button/Button.jsx';

import {recoveryValid} from '../../../common/validate/validate.js';
import {reqEmailRecovery, reqAuthIsLoad} from '../../../redux/user-selectors.js';

const Recovery = ({emailRecovery, authIsLoad, recoveryValid}) => {
	const recovery = () => {
		recoveryValid(emailRecovery);
	}

	return(
		<AuthPageWrapper>
			<div className="auth">
				<Logo />
				
				<div className="auth__wrapper">
					<div className="auth__inner">
						<div className="auth__img--inner">
							<img src="./assets/img/recovery.svg" alt="Вход" className="auth__img" />
						</div>

						<div className="auth__content recovery__field">
							<Input id="emailRecovery" value={emailRecovery} placeholder="Адрес электронной почты" />

							<div className="all__errors">

							</div>

							<div className="form__link--inner">
								<Link to={'/login'} className="form__link">
									Вспомнили пароль?
								</Link>
							</div>

							{authIsLoad 
							? <LoadButton />
							: <Button text={"Восстановить"} onClick={recovery} />}
						</div>
					</div>
				</div>
			</div>
		</AuthPageWrapper>
	)
}

const mapStateToProps = (state) => {
	return{
		emailRecovery: reqEmailRecovery(state),
		authIsLoad: reqAuthIsLoad(state)
	}
}

export default connect(mapStateToProps, {recoveryValid})(Recovery);