import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import NavLinkMui from '../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const Russian = () => {
	const gstyle = useStyles();

	return(
		<Box className={`${gstyle.linkInner} ${gstyle.w100}`}>
			<NavLinkMui variant="contained" href="tests/russian/1" className={`${gstyle.flexsh} ${gstyle.link}`}>
				1 вариант
			</NavLinkMui>

			<NavLinkMui variant="contained" href="tests/russian/2" className={`${gstyle.flexsh} ${gstyle.link}`}>
				2 вариант
			</NavLinkMui>
		</Box>
	)
}

export default Russian;