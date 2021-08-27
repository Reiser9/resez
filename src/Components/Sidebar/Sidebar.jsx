import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './Sidebar.css';

import Preloader from '../../common/Preloaders/Preloader/Preloader.jsx';
import SidebarNoAuth from './SidebarNoAuth/SidebarNoAuth.jsx';
import SidebarAuth from './SidebarAuth/SidebarAuth.jsx';
import Social from '../../common/Social/Social.jsx';

import {reqIsAuth, reqLoadAuth} from '../../redux/user-selectors.js';

const Sidebar = ({isAuth, loadAuth}) => {
	return(
		<div className="sidebar">
			{loadAuth
			? <Preloader />
			: <>
				<div className="sidebar__logo--inner">
				    <Link to={'/'} className="sidebar__logo">
				        ResEz
				    </Link>
				</div>

				{isAuth && <SidebarAuth />}

				<SidebarNoAuth />

				<Social className="sidebar__social" />
			</>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		loadAuth: reqLoadAuth(state)
	}
}

export default connect(mapStateToProps, {})(Sidebar);