import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import LinkMui from '../../../common/Buttons/LinkMui/LinkMui.jsx';

import {reqIsAuth} from '../../../redux/user-selectors.js';

const SidebarNoAuth = ({isAuth}) => {
	const gstyle = useStyles();
	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.sidebarContent}`}>
		    <Box className={`${gstyle.flexstart} ${gstyle.w100}`}>
		    	{!isAuth && <>
		    		<LinkMui href="login" className={`${gstyle.w100} ${gstyle.sidebarLink}`} color="primary.main">
		    			Вход
		    		</LinkMui>

		    		<LinkMui href="register" className={`${gstyle.w100} ${gstyle.sidebarLink}`} color="primary.main">
		    			Регистрация
		    		</LinkMui>
		    	</>}
		        <LinkMui href="info" className={`${gstyle.w100} ${gstyle.sidebarLink}`} color="primary.main">
		        	Информация о ЕГЭ
		        </LinkMui>

		        <LinkMui href="tasks" className={`${gstyle.w100} ${gstyle.sidebarLink}`} color="primary.main">
		        	Разбор заданий
		        </LinkMui>
		        {isAuth && <LinkMui href="tests" className={`${gstyle.w100} ${gstyle.sidebarLink}`} color="primary.main">
		       		Тесты
		       	</LinkMui>}
		    </Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state)
	}
}

export default connect(mapStateToProps, {})(SidebarNoAuth);