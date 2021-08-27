import React from 'react';
import {connect} from 'react-redux';

import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

import {reqIsAuth} from '../../../redux/user-selectors.js';

const SidebarNoAuth = ({isAuth}) => {
	return(
		<div className="sidebar__noauth">
		    <div className="sidebar__nav">
		    	{!isAuth &&
		    	<>
		    		<NavLinkButton text={'Вход'} href={'login'} classMore="sidebar__nav--link" />
		    		<NavLinkButton text={'Регистрация'} href={'register'} classMore="sidebar__nav--link" />
		    	</>}
		        <NavLinkButton text={'Информация о ЕГЭ'} href={'info'} classMore="sidebar__nav--link" />
		        <NavLinkButton text={'Разбор заданий'} href={'tasks'} classMore="sidebar__nav--link" />
		        {isAuth &&
		       	<>
		       		<NavLinkButton text={'Тесты'} href={'tests'} classMore="sidebar__nav--link" />
		       	</>}
		    </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state)
	}
}

export default connect(mapStateToProps, {})(SidebarNoAuth);