import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLocal from '../../../../common/Inputs/InputLocal/InputLocal.jsx';
import LoadButtonMui from '../../../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';
import PreloaderTopOpacity from '../../../../common/Preloaders/PreloaderTopOpacity/PreloaderTopOpacity.jsx';

import {confirmEmail, editEmail} from '../../../../redux/auth-reducer.js';
import {reqEmail, reqEditEmailLoad, reqVerificateEmail} from '../../../../redux/user-selectors.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';

const ChangeEmail = ({email, verificateEmail, editEmailLoad, confirmEmail, editEmail, patternNotify}) => {
	const gstyle = useStyles();

	const [emailEdit, setEmailEdit] = React.useState(''); //Записываем измененную почту
	const [emailSend, setEmailSend] = React.useState(false); //Письмо успешно отправлено, ожидайте

	const editEmailUser = () => {
		emailEdit !== email ? editEmail(emailEdit, setEmailSend) : patternNotify('data_not_edit');
	}

	const confirmUserEmail = () => {
		confirmEmail();
		setEmailSend(true);
	}

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.settingsBox}`} sx={{mt: {r1520: 0, r700: 3, r0: 2}}}>
			<Typography component="p" variant="p">
				Адрес электронной почты:
			</Typography>

			{email
			? <>
				<InputLocal val={email} editSetData={setEmailEdit} editDataVal={emailEdit} placeholder="Адрес электронной почты"/>

				{verificateEmail
				? <Button className={gstyle.w100} variant="contained" sx={{mt: 1, pointerEvents: 'none'}}>
					Почта подтверждена
				</Button>
				: emailSend 
				? <Button className={gstyle.w100} sx={{mt: 1}} variant="outlined">
					Ожидайте письмо
				</Button>
				: <Button className={gstyle.w100} sx={{mt: 1}} variant="outlined" onClick={confirmUserEmail}>
					Подтвердить почту
				</Button>}

				{editEmailLoad
				? <LoadButtonMui className={gstyle.w100} sx={{mt: 1}}>
					Загрузка...
				</LoadButtonMui>
				: <Button className={gstyle.w100} sx={{mt: 1}} variant="contained" onClick={editEmailUser}>
					Изменить
				</Button>}
			</>
			: <PreloaderTopOpacity />}
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		email: reqEmail(state),
		verificateEmail: reqVerificateEmail(state),
		editEmailLoad: reqEditEmailLoad(state)
	}
}

export default connect(mapStateToProps, {confirmEmail, editEmail, patternNotify})(ChangeEmail);