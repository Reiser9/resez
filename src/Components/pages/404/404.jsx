import React from 'react';

import NotFoundImg from '../../../assets/img/NotFoundImg.jsx';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import NavLinkMui from '../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const NotFound = () => {
	const gstyle = useStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Страница не найдена';
	}, []);

	return(
		<Box sx={{minHeight: '100vh', p: 2}} className={`${gstyle.flex} ${gstyle.w100}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100}`}>
				<Box sx={{width: {r860: '645px', r0: '80%'}}}>
					<NotFoundImg />
				</Box>

				<Typography component="h2" variant="h2" className={gstyle.w100} sx={{mt: {r1200: 5, r0: 3}, textAlign: 'center'}}>
					Куда я попал?
				</Typography>

				<Typography component="p" variant="h5" className={gstyle.w100} sx={{mt: {r860: 2, r0: 1}, textAlign: 'center',
				p: {r480: '0 3rem', r0: '0 1rem'}}}>
					Видимо, вы уже изучили каждый уголок нашего сайта и завернули куда-то не туда, скорее возвращайтесь на главную страницу!
				</Typography>

				<NavLinkMui exact sx={{mt: 3}}>
					На главную
				</NavLinkMui>
			</Box>
		</Box>
	)
}

export default NotFound;