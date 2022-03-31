import React from 'react';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UsersData = ({title, value, bool = false}) => {
	const gstyle = useStyles();
	
	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 1}}>
			<Typography component="p" variant="p2" color="greytext.main">
				{title}:
			</Typography>

			<Typography component="p" variant="p" sx={{wordBreak: 'break-all'}}>
				{bool ? value ? 'Да' : 'Нет' : value}
			</Typography>
		</Box>
	)
}

export default React.memo(UsersData);