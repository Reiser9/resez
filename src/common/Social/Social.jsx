import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const useLocalStyles = makeStyles({
	link: {
		width: 35,
		height: 35,
		borderRadius: '50%',
		'&:last-child': {
			marginRight: 0
		},
		'&:hover': {
			opacity: .6
		}
	}
});

const Social = () => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	return(
		<Box className={`${gstyle.w100} ${gstyle.flex}`}>
		    <Link href="https://vk.com" className={`${gstyle.flexsh} ${gstyle.flex} ${localStyle.link}`} sx={{mr: 2}} target="_Blanc">
		        <img src="/assets/img/vk.svg" alt="Вк" className={gstyle.img} />
		    </Link>

		    <Link href="https://telegram.com" className={`${gstyle.flexsh} ${gstyle.flex} ${localStyle.link}`} sx={{mr: 2}} target="_Blanc">
		        <img src="/assets/img/telegram.svg" alt="Телеграм" className={gstyle.img} />
		    </Link>

		    <Link href="https://www.youtube.com" className={`${gstyle.flexsh} ${gstyle.flex} ${localStyle.link}`} sx={{mr: 2}} target="_Blanc">
		        <img src="/assets/img/youtube.svg" alt="Ютуб" className={gstyle.img} />
		    </Link>

		    <Link href="https://tiktok.com" className={`${gstyle.flexsh} ${gstyle.flex} ${localStyle.link}`} target="_Blanc">
		        <img src="/assets/img/tt.svg" alt="Тик ток" className={gstyle.img} />
		    </Link>
		</Box>
	)
}

export default Social;