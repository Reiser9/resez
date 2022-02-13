import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Preloader from '../../../common/Preloaders/Preloader/Preloader.jsx';

import {reqIsAuth, reqLoadAuth, reqRole} from '../../../redux/user-selectors.js';

// Не пускает на страницу не авторизованных, перебрасывая их на главную
const PrivatePageWrapper = ({isAuth, loadAuth, children, role, admin = false}) => {
	if(loadAuth){
		return <Preloader />
	}

	if(admin){
		if(isAuth){
			if(role){
				if(role !== 'admin'){
					return <Redirect to={'/404'} />
				}
			}
			else{
				return <Preloader />
			}
		}
		else{
			return <Redirect to={'/404'} />
		}
	}

	if(!isAuth){
		return <Redirect to={'/login'} />
	}

	return(
		children
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		loadAuth: reqLoadAuth(state),
		role: reqRole(state)
	}
}

export default connect(mapStateToProps, {})(PrivatePageWrapper);