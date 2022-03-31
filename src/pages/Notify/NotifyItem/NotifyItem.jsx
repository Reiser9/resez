import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LoadButtonMui from '../../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';

import {readNotifyUser} from '../../../redux/notify-reducer.js';
import {reqReadNotifyLoad} from '../../../redux/user-selectors.js';

const useLocalStyles = makeStyles({
	notifyItem: {
		background: '#fff',
		padding: '1.5rem',
		borderRadius: 7
	},
	titleInner: {
		'@media (max-width: 480px)': {
		    flexDirection: "column-reverse",
		    alignItems: 'flex-start'
		},
	},
	title: {
		paddingRight: '2rem',
		'@media (max-width: 480px)': {
		    paddingRight: 0
		},
	}
});

const NotifyItem = ({data, readNotifyLoad, readNotifyUser}) => {
	const {title, text, date, read, id} = data;

	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	const readNotify = () => {
		readNotifyUser(id);
	}

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${localStyle.notifyItem}`}>
			<Box className={`${gstyle.flexbet} ${gstyle.w100} ${localStyle.titleInner}`}>
				<Typography component="p" variant="h4" className={localStyle.title} sx={{fontWeight: 700, mt: {r500: 0, r0: 1}}}>
					{title}
				</Typography>

				<Typography component="p" variant="p2" color="greytext.main">
					{date}
				</Typography>
			</Box>

			<Typography component="p" variant="p" className={gstyle.w100} sx={{mt: 1}}>
				{text}
			</Typography>

			<Box className={`${gstyle.flexbet} ${gstyle.w100}`} sx={{mt: 2}}>
				{read
				? <LoadButtonMui text="Прочитано"/>
				: <>
					{readNotifyLoad
					? <LoadButtonMui text="Загрузка..." />
					: <Button variant="contained" onClick={readNotify}>
						Прочитать
					</Button>}
					
					<Box sx={{width: 20, height: 20, borderRadius: '50%', bgcolor: '#ff6666'}}></Box>
				</>}
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		readNotifyLoad: reqReadNotifyLoad(state)
	}
}

export default connect(mapStateToProps, {readNotifyUser})(React.memo(NotifyItem));