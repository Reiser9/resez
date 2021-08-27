import React from 'react';
import {connect} from 'react-redux';

import PreloaderTop from '../../../common/Preloaders/PreloaderTop/PreloaderTop.jsx';
import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

import {quitUser} from '../../../redux/auth-reducer.js';
import {reqStatus, reqName, reqSurname, reqImg, reqLvl, reqBalance, reqRole} from '../../../redux/user-selectors.js';

const SidebarAuth = ({status, name, surname, img, lvl, balance, role, quitUser}) => {
	const quit = () => {
		quitUser(true);
	}

	return(
	    <div className="sidebar__auth">
	        <div className="user__content">
	        	{name
	        	? <>
	        		<div className="user__inner">
		        		<NavLinkButton href={'profile'} classMore="user__img--inner">
		        		    <img src={img ? `./assets/img/${img}.svg` : "./assets/img/1.svg"} alt="Аватарка" className="user__img" />
		        		</NavLinkButton>

		        		<div className="user__data--inner">
		        		    <p className="user__data--name">
		        		        {name + " " + surname[0] + "."}
		        		    </p>

		        		    <p className="user__data--status">
		        		        {status}
		        		    </p>
		        		</div>

		        		<NavLinkButton text={lvl} href={'progress'} classMore="user__lvl--inner" />
		        	</div>

		        	<div className="user__balance--inner">
		        		<p className="user__balance">
		        			Баланс: {balance} руб
		        		</p>

		        		<NavLinkButton text={'Пополнить'} href={'payment'} classMore="button white__button user__balance--button" />
		        	</div>
	        	</>
	        	: <PreloaderTop />}
	        </div>

	        <div className="sidebar__nav">
	        	{role === 'admin' && <NavLinkButton text={'Админка'} href={'admin'} classMore="sidebar__nav--link" />}
	        	<NavLinkButton text={'Мой профиль'} href={'profile'} classMore="sidebar__nav--link" />
	            <NavLinkButton text={'Уведомления'} href={'notify'} classMore="sidebar__nav--link" />
	            <NavLinkButton text={'Цветовая гамма'} href={'sitecolor'} classMore="sidebar__nav--link" />
	            <button onClick={quit} className="button sidebar__button sidebar__nav--link quit__button">Выйти</button>
	        </div>
	    </div>
	)
}

const mapStateToProps = (state) => {
	return{
		status: reqStatus(state),
		name: reqName(state),
		surname: reqSurname(state),
		img: reqImg(state),
		lvl: reqLvl(state),
		balance: reqBalance(state),
		role: reqRole(state)
	}
}

export default connect(mapStateToProps, {quitUser})(SidebarAuth);