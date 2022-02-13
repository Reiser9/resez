import React from 'react';
import {NavLink} from 'react-router-dom';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../theme/gstyle.js';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const useLocalStyles = makeStyles({
	index: {
		width: 25,
		height: 25,
		borderRadius: '50%',
		background: '#ff6666',
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		right: 20,
		border: '1px solid #fff',
		color: '#fff',
		fontSize: '1.6rem'
	}
});

const LinkMui = ({href = '', text, children, notify = false, notifyNotRead = 0, ...props}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	return(
		<Link component={NavLink} to={`/${href}`} {...props}>
			{text}
			{children}

			{notify && notifyNotRead > 0 && <Box component="span" className={`${gstyle.flex} ${localStyle.index}`}>{notifyNotRead}</Box>}
		</Link>
	)
}

export default LinkMui;