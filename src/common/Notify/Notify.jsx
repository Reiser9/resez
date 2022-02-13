import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../theme/gstyle.js';

import {removeNotify} from '../../redux/notify-reducer.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const useLocalStyles = makeStyles(theme => ({
	notify: {
		marginTop: 10,
		padding: '1rem 2rem',
		borderRadius: 7,
		background: '#fff',
		display: 'flex',
		aligItems: 'flex-start',
		border: '2px solid transparent',
		'&.info': {
			border: `2px solid ${theme.palette.info.main}`
		},
		'&.warn': {
			border: `2px solid ${theme.palette.warn.main}`
		},
		'&.error': {
			border: `2px solid ${theme.palette.error.main}`
		},
		'&.success': {
			border: '2px solid #6bbb69'
		},
		'@media (max-width: 500px)': {
			padding: '1rem',
		    marginTop: 5
		}
	},
	imgInner: {
		width: 45,
		height: 45,
		display: 'flex',
		marginRight: 1.5,
		'@media (max-width: 500px)': {
			width: 45,
			height: 45,
		    marginRight: 1
		}
	}
}));

// Уведомления, заголовок, текст, тип уведомления, id, время отображения уведомления
const Notify = ({data, removeNotify, time = 1500}) => {
	const {title, text, type, id} = data;

	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	const remove = () => {
		removeNotify(id);
	}

	const removeClick = () => {
		clearTimeout(notifyTimeOut);
		remove();
	}

	let notifyTimeOut = setTimeout(remove, time);

	return(
		<Box className={`${gstyle.w100} ${localStyle.notify} ${type}`} onClick={removeClick}>
		    <Box className={gstyle.flexsh} sx={{width: 45, height: 45, display: 'flex', mr: {r500: 1.5, r0: 1}}}>
		        <img src={`/assets/img/${type}.svg`} className={gstyle.img} alt="Иконка" />
		    </Box>

		    <Box className={`${gstyle.flexstart} ${gstyle.w100}`}>
		        <Typography component="p" variant="p" sx={{fontWeight: 700}}>
		            {title}
		        </Typography>

		        <Typography component="p" variant="p2" sx={{mt: {r500: .5, r0: 0}}}>
		            {text}
		        </Typography>
		    </Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {removeNotify})(React.memo(Notify));