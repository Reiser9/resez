import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

const PreloaderTop = () => {
	const gstyle = useStyles();
	return(
		<Box className={`${gstyle.loaderInnerTop} ${gstyle.flex} ${gstyle.w100}`}>
			<Box className={`${gstyle.loader} ${gstyle.loaderSmall}`}></Box>
		</Box>
	)
}

export default PreloaderTop;