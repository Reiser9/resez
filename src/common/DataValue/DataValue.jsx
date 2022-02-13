import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';

const useLocalStyles = makeStyles(theme => ({
	data: {
		marginTop: '1rem',
		padding: '0.75rem 1.5rem',
		borderRadius: 7,
		border: `1px solid ${theme.palette.border.main}`,
		'@media (max-width: 500px)': {
			padding: '0.8rem 1.3rem',
		    fontSize: '1.6rem'
		}
	}
}));

// Передаем текст
const DataValue = ({value}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	return(
		<Box className={`${gstyle.w100} ${localStyle.data}`}>
			{value}
		</Box>
	)
}

export default React.memo(DataValue);