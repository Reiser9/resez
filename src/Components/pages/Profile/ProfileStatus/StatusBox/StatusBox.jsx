import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import StatusItem from './StatusItem/StatusItem.jsx';

import {reqStatus} from '../../../../../redux/user-selectors.js';

const useLocalStyles = makeStyles({
	statusBox: {
		width: '49%',
		'@media(max-width: 1200px)': {
			width: '100%',
			marginTop: 20
		},
		'&:first-child': {
			marginTop: 0
		}
	},
	statusContent: {
		maxHeight: '400px',
		overflowY: 'auto',
		overflowX: 'hidden',
		paddingRight: 10
	}
});

const StatusBox = ({title, data, status}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	return(
		<Box className={`${gstyle.flexstart} ${localStyle.statusBox}`}>
			<Typography sx={{fontWeight: 700}} component="p" variant="h4">
				{title}:
			</Typography>

			<Box sx={{mt: 2}} className={`${gstyle.w100} ${gstyle.flexstart} ${localStyle.statusContent}`}>
				{data.map((d, id) => <StatusItem key={id} status={d.status} message={d.message} active={status === d.status} />)}
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		status: reqStatus(state)
	}
}

export default connect(mapStateToProps, {})(React.memo(StatusBox));