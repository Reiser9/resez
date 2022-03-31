import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';

const useLocalStyles = makeStyles(theme => ({
	statusItem: {
		marginTop: 10,
		padding: '10px 15px',
		background: '#fff',
		cursor: 'pointer',
		transition: '.2s linear',
		borderRadius: 10,
		border: '1px solid transparent',
		'&:hover': {
			border: `1px solid ${theme.palette.primary.main}`
		},
		'&:first-child': {
			marginTop: 0
		},
		'@media(max-width: 500px)': {
			fontSize: 16
		}
	},
	img: {
		width: 25,
		marginLeft: 30
	},
	active: {
		border: `1px solid ${theme.palette.primary.main}`
	},
	disable: {
		pointerEvents: 'none'
	}
}));

const StatusItem = ({status, message, active = false, have = false}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	const [open, setOpen] = React.useState(false);

	return(
		<Box className={`${gstyle.w100} ${gstyle.flexbet} ${localStyle.statusItem} ${active && localStyle.active} ${have && localStyle.disable}`}>
			{status}

			{(active || have) && <img src="/assets/img/success.svg" alt="Картинка" className={`${gstyle.flexsh} ${localStyle.img}`} />}
		</Box>
	)
}

export default React.memo(StatusItem);