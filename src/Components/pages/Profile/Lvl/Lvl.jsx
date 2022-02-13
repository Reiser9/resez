import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const useLocalStyles = makeStyles({
	lvl: {
		background: 'var(--mainC)',
		color: '#fff',
		width: 41,
		height: 41,
		borderRadius: 50,
		'@media (max-width: 1200px)': {
			width: 35,
			height: 35
		},
		'@media (max-width: 500px)': {
			fontSize: '1.6rem'
		}
	}
});

const Lvl = ({exp, lvl}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	const [allExp, setAllExp] = React.useState(1); //Всего опыта до следующего уровня
	const [progress, setProgress] = React.useState(0); //Ваш опыт

	React.useEffect(() => {
		setAllExp(lvl * (900 / 2));
		setProgress(exp / allExp * 100);
	}, [lvl, exp, allExp]);

	return(
		<Box className={`${gstyle.flexcenter} ${gstyle.w100}`} sx={{mt: 1.5}}>
			<Box sx={{width: 40, display: 'flex'}}>
				<img src="/assets/img/crown.svg" alt="Корона" className={gstyle.img} />
			</Box>

			<Box className={`${gstyle.flex} ${gstyle.w100}`}>
				<Box className={`${gstyle.flex} ${gstyle.flexsh} ${localStyle.lvl}`}>
					{lvl}
				</Box>

				<Box className={gstyle.w100} sx={{m: '0 1rem'}}>
					<LinearProgress variant="determinate" value={progress} />
				</Box>

				<Box className={`${gstyle.flex} ${gstyle.flexsh} ${localStyle.lvl}`}>
					{lvl + 1}
				</Box>
			</Box>

			<Typography component="p" variant="p2" className={gstyle.textCenter}>
				Опыт: {exp}/{allExp}
			</Typography>
		</Box>
	)
}

export default Lvl;