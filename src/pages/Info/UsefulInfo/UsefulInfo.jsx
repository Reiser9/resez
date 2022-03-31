import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UsefulInfo = () => {
	React.useEffect(() => {
		document.title = 'ResEz - Полезные советы';
	}, []);

	return(
		<Box>
			<Typography component="h2" variant="h3">
				Полезное
			</Typography>
		</Box>
	)
}

export default UsefulInfo;