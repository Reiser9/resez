import React from 'react';

import BanImg from '../../../assets/img/BanImg.jsx';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const UserBan = () => {
	const gstyle = useStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Вы заблокированы'
	}, []);

	return(
		<Box sx={{minHeight: '100vh', p: 2}} className={`${gstyle.flex} ${gstyle.w100}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100}`}>
				<Box sx={{width: {r860: '645px', r0: '80%'}}}>
					<BanImg />
				</Box>

				<Typography component="h2" variant="h2" className={gstyle.w100} sx={{mt: {r1200: 5, r0: 3}, textAlign: 'center'}}>
					Ваш аккаунт заблокирован
				</Typography>

				<Typography component="p" variant="h5" className={gstyle.w100} sx={{mt: {r860: 2, r0: 1}, textAlign: 'center',
				p: {r480: '0 3rem', r0: '0 1rem'}}}>
					Причина: аморальное поведение
				</Typography>

				<Typography component="p" variant="h5" className={gstyle.w100} sx={{mt: {r860: 2, r0: 1}, textAlign: 'center',
				p: {r480: '0 3rem', r0: '0 1rem'}}}>
					Если вы не согласны с решением, то вы можете написать в поддержку
				</Typography>
			</Box>
		</Box>
	)
}

export default UserBan;