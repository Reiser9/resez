import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

import Data from '../Data/Data.jsx';
import Settings from '../Settings/Settings.jsx';

const useLocalStyles = makeStyles(theme => ({
	profile: {
		display: 'flex',
		'@media (max-width: 700px)': {
		    flexDirection: 'column',
		    alignItems: 'flex-start'
		}
	},
	data: {
		background: theme.palette.lightblue.main,
		borderRadius: 15,
		padding: 30,
		justifyContent: 'space-between',
		maxWidth: 516,
		marginRight: '6rem',
		'@media (max-width: 1700px)': {
		    marginRight: '4rem',
		    maxWidth: 420
		},
		'@media (max-width: 1260px)': {
		    marginRight: '2rem',
		},
		'@media (max-width: 1200px)': {
		    padding: '4rem 1.5rem',
		    maxWidth: 300
		},
		'@media (max-width: 700px)': {
		    maxWidth: '100%'
		}
	},
	settings: {
		background: theme.palette.lightblue.main,
		borderRadius: 15,
		padding: '3rem',
		'@media (max-width: 1200px)': {
		    padding: '2.5rem 1.5rem'
		},
		'@media (max-width: 700px)': {
		    marginTop: '3rem'
		}
	}
}));

const ProfilePage = () => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Профиль';
	}, []);

	return(
		<Box className={`${gstyle.w100} ${localStyle.profile}`}>
			<Box className={`${gstyle.flexstart} ${gstyle.flexsh} ${gstyle.w100} ${localStyle.data}`}>
				<Data />
			</Box>

			<Box className={`${gstyle.flexstart} ${gstyle.w100} ${localStyle.settings}`}>
				<Settings />
			</Box>
		</Box>
	)
}

export default ProfilePage;