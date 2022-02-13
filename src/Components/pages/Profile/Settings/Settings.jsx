import React from 'react';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ChangePassword from './ChangePassword/ChangePassword.jsx';
import ChangeEmail from './ChangeEmail/ChangeEmail.jsx';
import OtherSettings from './OtherSettings/OtherSettings.jsx';

const Settings = () => {
	const gstyle = useStyles();

	return(
		<>
			<Typography component="h2" variant="h3" className={`${gstyle.w100} ${gstyle.textCenter}`}>
				Настройки
			</Typography>

			<Box className={`${gstyle.flexwrap} ${gstyle.w100}`} sx={{mt: {r700: 3, r0: 1}}}>
				<ChangePassword />

				<ChangeEmail />

				<OtherSettings />
			</Box>
		</>
	)
}

export default Settings;