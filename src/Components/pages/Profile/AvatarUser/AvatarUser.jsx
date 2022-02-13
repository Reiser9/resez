import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../../theme/gstyle.js'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import NavLinkMui from '../../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

import {reqImg, reqStatus} from '../../../../redux/user-selectors.js';

const useLocalStyles = makeStyles(theme => ({
	avatarInner: {
		'@media (max-width: 1200px)': {
		    flexDirection: 'column'
		}
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: '50%',
		margin: '0 3rem 0 0',
		position: 'relative',
		background: '#007cee', /*Задний фон менять из бд*/
		'@media (max-width: 1200px)': {
		    margin: '0 0 2rem 0'
		},
		'@media (max-width: 998px)': {
		    width: 100,
		    height: 100
		}
	},
	status: {
		textAlign: 'center',
		borderRadius: 7,
		padding: '0.75rem 1.5rem',
		border: `1px solid ${theme.palette.primary.main}`,
		background: '#fff'
	}
}));

const AvatarUser = ({img, status}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	return(
		<Box className={`${gstyle.flex} ${gstyle.w100} ${localStyle.avatarInner}`}>
			<Box className={`${gstyle.flex} ${gstyle.flexsh} ${localStyle.avatar}`}>
				<img src={img ? `/assets/img/${img}.svg` : '/assets/img/1.svg'} alt="Аватарка" className={gstyle.imgRes} />
			</Box>

			<Box className={`${gstyle.flexstart} ${gstyle.w100}`}>
				<Typography color="primary.main" component="p" variant="p" className={`${gstyle.w100} ${localStyle.status}`}>
					{status}
				</Typography>

				<NavLinkMui href="profile/status" className={gstyle.w100} sx={{mt: 1}} variant="contained">
					Изменить статус
				</NavLinkMui>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		img: reqImg(state),
		status: reqStatus(state)
	}
}

export default connect(mapStateToProps, {})(AvatarUser);