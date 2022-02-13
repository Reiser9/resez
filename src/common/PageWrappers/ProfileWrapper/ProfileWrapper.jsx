import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

const ProfileWrapper = ({children}) => {
	const gstyle = useStyles();
	
	return(
		<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.wrapperContent} ${gstyle.wrapperProfile}`}>
			{children}
		</Box>
	)
}

export default ProfileWrapper;