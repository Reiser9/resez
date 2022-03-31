import React from 'react';

import {useStyles} from '../../../../../theme/gstyle.js';

import Typography from '@mui/material/Typography';

const PointInfoBlock = ({first, second}) => {
	const gstyle = useStyles();

	return(
		<>
			<Typography component="p" variant="p" className={gstyle.tableItem}>
				{first}
			</Typography>

			<Typography component="p" variant="p" className={gstyle.tableItem}>
				{second}
			</Typography>
		</>
	)
}

export default React.memo(PointInfoBlock);