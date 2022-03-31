import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Logo from '../../common/Logo/Logo.jsx';
import AuthPageWrapper from '../../common/PageWrappers/AuthPageWrapper/AuthPageWrapper.jsx';
import Input from '../../common/Inputs/Input/Input.jsx';
import LoadButtonMui from '../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';
import LinkMui from '../../common/Buttons/LinkMui/LinkMui.jsx';

import {loginValid} from '../../common/validate/validate.js';
import {reqAuthIsLoad, reqEmailEnter, reqPasswordEnter} from '../../redux/user-selectors.js';
import {patternNotify} from '../../redux/notify-reducer.js';

import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

const Login = ({emailEnter, passwordEnter, authIsLoad, loginValid, patternNotify}) => {
	const gstyle = useStyles();
	const {executeRecaptcha} = useGoogleReCaptcha();

	const verify = React.useCallback(async () => {
	    if(!executeRecaptcha){
	    	patternNotify('many_requests');
	    	return;
	    }
	    
	    await executeRecaptcha().then(token => {
	    	token && loginValid(emailEnter, passwordEnter);
	    });
	}, [emailEnter, passwordEnter, patternNotify, executeRecaptcha, loginValid]);

	React.useEffect(() => {
		document.title = 'ResEz - Авторизация';
	}, []);

	return(
		<AuthPageWrapper>
			<Box className={`${gstyle.w100} ${gstyle.auth}`}>
				<Logo />

				<Box className={`${gstyle.flex} ${gstyle.w100} ${gstyle.authWrapper}`}>
					<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.authInner}`}>
						<Box sx={{width: {r500: '80%', r0: '100%'}}}>
							<img src="./assets/img/login.svg" alt="Вход" className={gstyle.img} />
						</Box>

						<Box className={`${gstyle.flexstart} ${gstyle.w100} login__field`} sx={{mt: 3}}>
							<Input id="emailEnter" value={emailEnter} placeholder="Адрес электронной почты" />

							<Input id="passwordEnter" value={passwordEnter} placeholder="Пароль" password={true} />

							<div className="all__errors"></div>

							<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
								<LinkMui href="recovery" className={gstyle.authLink}>
									Забыли пароль?
								</LinkMui>

								<LinkMui href="register" className={gstyle.authLink} sx={{mt: 1}}>
									Нет аккаунта?
								</LinkMui>
							</Box>

							{authIsLoad
							? <LoadButtonMui className={gstyle.w100} sx={{mt: 4}}>
								Загрузка...
							</LoadButtonMui>
							: <Button variant="contained" className={gstyle.w100} onClick={verify} sx={{mt: 4}}>
								Войти
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
		emailEnter: reqEmailEnter(state),
		passwordEnter: reqPasswordEnter(state)
	}
}

export default connect(mapStateToProps, {loginValid, patternNotify})(Login);