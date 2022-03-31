import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Logo from '../../common/Logo/Logo.jsx';
import AuthPageWrapper from '../../common/PageWrappers/AuthPageWrapper/AuthPageWrapper.jsx';
import Input from '../../common/Inputs/Input/Input.jsx';
import LoadButtonMui from '../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';
import LinkMui from '../../common/Buttons/LinkMui/LinkMui.jsx';

import {registerValid} from '../../common/validate/validate.js';
import {reqEmailRegister, reqNickRegister, reqPasswordRegister, reqConfirmPasswordRegister, reqAuthIsLoad, 
reqNameRegister, reqSurnameRegister} from '../../redux/user-selectors.js';
import {patternNotify} from '../../redux/notify-reducer.js';

import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

const Register = ({registerUser, authIsLoad, emailRegister, nickRegister, nameRegister, surnameRegister,
 passwordRegister, confirmPasswordRegister, registerValid, patternNotify}) => {
 	const gstyle = useStyles();
 	
	const {executeRecaptcha} = useGoogleReCaptcha();

	const verify = React.useCallback(async () => {
	    if(!executeRecaptcha){
	    	patternNotify('many_requests');
	    	return;
	    }
	    
	    await executeRecaptcha().then(token => {
	    	token && registerValid(emailRegister, nickRegister, nameRegister, surnameRegister, passwordRegister, confirmPasswordRegister);
	    });
	}, [emailRegister, nickRegister, nameRegister, surnameRegister, passwordRegister, confirmPasswordRegister, patternNotify,
	executeRecaptcha, registerValid]);

	React.useEffect(() => {
		document.title = 'ResEz - Регистрация';
	}, []);

	return(
		<AuthPageWrapper>
			<Box className={`${gstyle.w100} ${gstyle.auth}`}>
				<Logo />

				<Box className={`${gstyle.flex} ${gstyle.w100} ${gstyle.authWrapper}`}>
					<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.authInner}`}>
						<Box sx={{width: {r500: '80%', r0: '100%'}}}>
							<img src="./assets/img/register.svg" alt="Регистрация" className={gstyle.img} />
						</Box>

						<Box className={`${gstyle.flexstart} ${gstyle.w100} register__field`} sx={{mt: 3}}>
							<Input id="emailRegister" value={emailRegister} placeholder="Адрес электронной почты" />
							<Input id="nickRegister" value={nickRegister} placeholder="Логин" />
							<Input id="nameRegister" value={nameRegister} placeholder="Имя" />
							<Input id="surnameRegister" value={surnameRegister} placeholder="Фамилия" />
							<Input id="passwordRegister" value={passwordRegister} placeholder="Пароль" password={true} />
							<Input id="confirmPasswordRegister" value={confirmPasswordRegister} placeholder="Пароль ещё раз" password={true} />

							<div className="all__errors"></div>

							<Typography component="p" variant="p2" color="greytext.main" sx={{mt: 2}}>
								Нажимая кнопку регистрация вы принимаете правила сервиса и пользовательское соглашение 
							</Typography>

							<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
								<LinkMui href="login" className={gstyle.authLink}>
									Уже зарегистрированы?
								</LinkMui>
							</Box>

							{authIsLoad
							? <LoadButtonMui className={gstyle.w100} sx={{mt: 4}}>
								Загрузка...
							</LoadButtonMui>
							: <Button variant="contained" className={gstyle.w100} onClick={verify} sx={{mt: 4}}>
								Регистрация
							</Button>}
						</Box>
					</Box>
				</Box>
			</Box>
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

export default connect(mapStateToProps, {registerValid, patternNotify})(Register);