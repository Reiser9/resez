import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

const Preloader = () => {
	const gstyle = useStyles();
	return(
		<Box className={`${gstyle.loaderInner} ${gstyle.flex} ${gstyle.w100}`}>
			<Box className={gstyle.loader}></Box>
		</Box>
	)
}

export default Preloader;