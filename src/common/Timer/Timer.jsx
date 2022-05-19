import React from 'react';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Timer = ({hours = 0, minutes = 0, seconds = 0}) => {
	const gstyle = useStyles();

	const [over, setOver] = React.useState(false);
	const [pause, setPause] = React.useState(false);

	const [[hoursLeft, minutesLeft, secondsLeft], setTime] = React.useState([hours, minutes, seconds]);
	const [[hoursPass, minutesPass, secondsPass], setTimePass] = React.useState([0, 0, 0]);

	const tick = () => {
		if(pause || over) return;

		// Осталось времени
		if(hoursLeft === 0 && minutesLeft === 0 && secondsLeft === 0){
			setOver(true);
			return;
		}
		else if(minutesLeft === 0 && secondsLeft === 0){
			setTime([hoursLeft - 1, 59, 59]);
		}
		else if(secondsLeft === 0){
			setTime([hoursLeft, minutesLeft - 1, 59]);
		}
		else{
			setTime([hoursLeft, minutesLeft, secondsLeft - 1]);
		}

		// Прошло времени
		if(minutesPass === 59 && secondsPass === 59){
			setTimePass([hoursPass + 1, 0, 0]);
		}
		else if(secondsPass === 59){
			setTimePass([hoursPass, minutesPass + 1, 0]);
		}
		else{
			setTimePass([hoursPass, minutesPass, secondsPass + 1]);
		}
	}

	React.useEffect(() => {
	    const timer = setInterval(() => tick(), 1000);

	    return () => {
	    	clearInterval(timer);
	    }
	});

	return(
		<Box className={gstyle.flexend}>
			<Typography variant="p" component="p">
				Осталось: {hoursLeft} часа {minutesLeft} минут {secondsLeft} секунд
			</Typography>

			<Typography variant="p" component="p">
				Прошло: {hoursPass} часа {minutesPass} минут {secondsPass} секунд
			</Typography>

			<Button disabled={over} variant="contained" sx={{mt: 1, width: '170px', textAlign: 'center'}} onClick={() => setPause(!pause)}>
				{pause ? 'Возобновить' : 'Пауза'}
			</Button>
		</Box>
	)
}

export default Timer;