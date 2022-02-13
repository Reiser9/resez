import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Logo from '../../../common/Logo/Logo.jsx';
import AuthPageWrapper from '../../../common/PageWrappers/AuthPageWrapper/AuthPageWrapper.jsx';
import Input from '../../../common/Inputs/Input/Input.jsx';
import LoadButtonMui from '../../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';
import LinkMui from '../../../common/Buttons/LinkMui/LinkMui.jsx';
import Button from '@mui/material/Button';

import {recoveryValid} from '../../../common/validate/validate.js';
import {reqEmailRecovery, reqAuthIsLoad} from '../../../redux/user-selectors.js';
import {patternNotify} from '../../../redux/notify-reducer.js';

import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

const Recovery = ({emailRecovery, authIsLoad, recoveryValid, patternNotify}) => {
	const gstyle = useStyles();
	
	const {executeRecaptcha} = useGoogleReCaptcha();

	const verify = React.useCallback(async () => {
	    if(!executeRecaptcha){
	    	patternNotify('many_requests');
	    	return;
	    }
	    
	    await executeRecaptcha().then(token => {
	    	token && recoveryValid(emailRecovery);
	    });
	}, [emailRecovery, patternNotify, executeRecaptcha, recoveryValid]);

	React.useEffect(() => {
		document.title = 'ResEz - Восстановление пароля';
	}, []);

	return(
		<AuthPageWrapper>
			<Box className={`${gstyle.w100} ${gstyle.auth}`}>
				<Logo />
				
				<Box className={`${gstyle.flex} ${gstyle.w100} ${gstyle.authWrapper}`}>
					<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.authInner}`}>
						<Box sx={{width: {r500: '80%', r0: '100%'}}}>
							<img src="./assets/img/recovery.svg" alt="Восстановление пароля" className={gstyle.img} />
						</Box>

						<Box className={`${gstyle.flexstart} ${gstyle.w100} recovery__field`} sx={{mt: 3}}>
							<Input id="emailRecovery" value={emailRecovery} placeholder="Адрес электронной почты" />

							<div className="all__errors"></div>

							<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
								<LinkMui href="login" className={gstyle.authLink}>
									Вспомнили пароль?
								</LinkMui>
							</Box>

							{authIsLoad 
							? <LoadButtonMui className={gstyle.w100} sx={{mt: 4}}>
								Загрузка...
							</LoadButtonMui>
							: <Button variant="contained" className={gstyle.w100} onClick={verify} sx={{mt: 4}}>
								Восстановить
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
		emailRecovery: reqEmailRecovery(state),
		authIsLoad: reqAuthIsLoad(state)
	}
}

export default connect(mapStateToProps, {recoveryValid, patternNotify})(Recovery);