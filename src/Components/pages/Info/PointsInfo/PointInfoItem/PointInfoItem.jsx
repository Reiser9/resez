import React from 'react';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PointInfoBlock from './PointInfoBlock/PointInfoBlock.jsx';

const PointInfoItem = ({data}) => {
	const gstyle = useStyles();

	return(
		<Box sx={{mt: 2}} className={`${gstyle.w100} ${gstyle.flexcenter}`}>
			{data.updateDate && <Typography component="p" variant="p" color="success.light" sx={{fontWeight: 700}}>
				Шкала обновлена {data.updateDate}
			</Typography>}

			<Box sx={{width: '100%', maxWidth: '400px', mt: 1, display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
				<Typography component="p" variant="p" className={gstyle.tableItem}>
					Первичные баллы
				</Typography>

				<Typography component="p" variant="p" className={gstyle.tableItem}>
					Вторичные баллы
				</Typography>

				{data.data.map((d, id) => <PointInfoBlock key={id} first={id + 1} second={d} />)}
			</Box>
		</Box>
	)
}

export default React.memo(PointInfoItem);