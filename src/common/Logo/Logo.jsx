import React from 'react';
import {Link as LinkRect} from 'react-router-dom';
import {makeStyles} from '@mui/styles';

import Link from '@mui/material/Link';

const useLocalStyles = makeStyles(theme => ({
	logo: {
		position: 'absolute',
		top: 15,
		left: 30,
		zIndex: 10,
		color: theme.palette.primary.main,
		'@media (max-width: 998px)': {
		    display: 'none'
		},
	}
}));

const Logo = () => {
	const localStyle = useLocalStyles();
	
	return(
		<Link component={LinkRect} to={'/'} variant="h1" className={localStyle.logo}>
			ResEz
		</Link>
	)
}

export default Logo;