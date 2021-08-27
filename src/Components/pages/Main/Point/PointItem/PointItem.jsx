import React from 'react';
import {connect} from 'react-redux';

import './PointItem.css';

import NavLinkButton from '../../../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

import {reqIsAuth} from '../../../../../redux/user-selectors.js';

const PointItem = ({title, text, buttonText, link, buttonAuth = false, isAuth}) => {
	return(
		<div className="point__item flexstart w100">
		    <div className="point__item--text--inner flexstart w100">
		        <h3 className="point__item--title">
		            {title}
		        </h3>

		        <p className="point__item--text">
		            {text}
		        </p>
		    </div>

		    {buttonAuth
		    ? isAuth
		    ? <NavLinkButton text={buttonText} href={link} classMore="button point__item--button" />
			: <button className="button point__item--button disable">
		        Авторизуйтесь
		    </button>
			: <NavLinkButton text={buttonText} href={link} classMore="button point__item--button" />}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state)
	}
}

export default connect(mapStateToProps, {})(PointItem);