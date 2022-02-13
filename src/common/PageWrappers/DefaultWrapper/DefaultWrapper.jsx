import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

const DefaultWrapper = ({children}) => {
	const gstyle = useStyles();

	return(
		<Box className={`${gstyle.flexsh} ${gstyle.w100} ${gstyle.wrapper}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.wrapperContent}`}>
				{children}
			</Box>
		</Box>
	)
}

export default DefaultWrapper;