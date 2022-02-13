import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import InputLocal from '../../../../../common/Inputs/InputLocal/InputLocal.jsx';
import LoadButtonMui from '../../../../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';

import {editPassword} from '../../../../../redux/auth-reducer.js';
import {patternNotify} from '../../../../../redux/notify-reducer.js';
import {reqEditPasswordLoad} from '../../../../../redux/user-selectors.js';

const ChangePassword = ({patternNotify, editPassword, editPasswordLoad}) => {
	const gstyle = useStyles();

	const [passwordEdit, setPasswordEdit] = React.useState(''); //Записываем измененный пароль
	const [confirmPasswordEdit, setConfirmPasswordEdit] = React.useState(''); //Записываем измененный повтор пароля

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

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.settingsBox}`}>
			<Typography component="p" variant="p">
				Смена пароля:
			</Typography>

			<InputLocal val="" editSetData={setPasswordEdit} editDataVal={passwordEdit} placeholder="Новый пароль" password={true} />

			<InputLocal val="" editSetData={setConfirmPasswordEdit} editDataVal={confirmPasswordEdit} placeholder="Новый пароль ещё раз" password={true} />

			{editPasswordLoad
			? <LoadButtonMui className={gstyle.w100} sx={{mt: 1}}>
				Загрузка...
			</LoadButtonMui>
			: <Button className={gstyle.w100} variant="contained" sx={{mt: 1}} onClick={editPasswordUser}>
				Сменить пароль
			</Button>}
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		editPasswordLoad: reqEditPasswordLoad(state)
	}
}

export default connect(mapStateToProps, {patternNotify, editPassword})(ChangePassword);