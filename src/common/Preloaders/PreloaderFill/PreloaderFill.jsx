import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

const PreloaderFill = () => {
	const gstyle = useStyles();
	return(
		<Box className={`${gstyle.loaderInnerFill} ${gstyle.flex} ${gstyle.w100}`}>
			<Box className={gstyle.loader}></Box>
		</Box>
	)
}

export default PreloaderFill;