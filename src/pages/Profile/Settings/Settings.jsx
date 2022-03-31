import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ChangePassword from './ChangePassword/ChangePassword.jsx';
import ChangeEmail from './ChangeEmail/ChangeEmail.jsx';
import OtherSettings from './OtherSettings/OtherSettings.jsx';

import {setDeleteModal} from '../../../redux/modal-reducer.js';

const Settings = ({setDeleteModal}) => {
	const gstyle = useStyles();

	return(
		<Box className={`${gstyle.w100} ${gstyle.flexcenter}`} sx={{justifyContent: 'space-between', height: '100%'}}>
			<Box className={`${gstyle.w100} ${gstyle.flexcenter}`}>
				<Typography component="h2" variant="h3" className={`${gstyle.w100} ${gstyle.textCenter}`}>
					Настройки
				</Typography>

				<Box className={`${gstyle.flexwrap} ${gstyle.w100}`} sx={{mt: {r700: 3, r0: 1}}}>
					<ChangePassword />

					<ChangeEmail />

					<OtherSettings />
				</Box>
			</Box>

			<Typography variant="p" component="p">
				Вы можете 

				<Typography sx={{ml: .5, cursor: 'pointer'}} variant="p" component="span" color="error" onClick={() => setDeleteModal(true)}>
					удалить свой аккаунт
				</Typography>
			</Typography>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {setDeleteModal})(Settings);