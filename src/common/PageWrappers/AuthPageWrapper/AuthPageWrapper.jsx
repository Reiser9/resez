import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';

import Preloader from '../../../common/Preloaders/Preloader/Preloader.jsx';

import {reqIsAuth, reqLoadAuth} from '../../../redux/user-selectors.js';

// Страница, на которую нельзя зайти авторизированным пользователям
const AuthPageWrapper = ({isAuth, loadAuth, children}) => {
	if(loadAuth){
		return <Preloader />
	}

	if(isAuth){
		return <Navigate to={'/'} />
	}

	return(
		children
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		loadAuth: reqLoadAuth(state)
	}
}

export default connect(mapStateToProps, {})(AuthPageWrapper);