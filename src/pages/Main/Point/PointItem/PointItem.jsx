import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import NavLinkMui from '../../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';
import LoadButtonMui from '../../../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';

import {reqIsAuth} from '../../../../redux/user-selectors.js';

const PointItem = ({data, isAuth}) => {
	const gstyle = useStyles();
	
	const {title, text, buttonText, link, buttonAuth = false} = data;

	return(
		<Box sx={{p: '2rem', borderRadius: 1.5, justifyContent: 'space-between', bgcolor: 'lightgrey.main'}}
		className={`${gstyle.flexstart} ${gstyle.w100}`}>
		    <Box className="point__item--text--inner flexstart w100">
		        <Typography component="h2" variant="h3" className={gstyle.w100}>
		            {title}
		        </Typography>

		        <Typography sx={{mt: 1}} component="p" variant="p" className={gstyle.w100}>
		            {text}
		        </Typography>
		    </Box>

		    {buttonAuth
		    ? isAuth
		    ? <NavLinkMui sx={{marginTop: 2}} href={link}>{buttonText}</NavLinkMui>
			: <LoadButtonMui sx={{marginTop: 2}}>Авторизуйтесь</LoadButtonMui>
			: <NavLinkMui sx={{marginTop: 2}} href={link}>{buttonText}</NavLinkMui>}
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state)
	}
}

export default connect(mapStateToProps, {})(React.memo(PointItem));