import React from 'react';
import {connect} from 'react-redux';

import './Footer.css';

import PreloaderFill from '../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import Social from '../../common/Social/Social.jsx';
import NavLinkButton from '../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

import {reqIsAuth, reqLoadAuth} from '../../redux/user-selectors.js';

const Footer = ({isAuth, loadAuth}) => {
	return(
		<footer className="footer">
			{loadAuth
			? <PreloaderFill />
			: <>
				<div className="footer__content">
				    <div className="footer__item">
				        <p className="footer__item--title">
				            Экзамены:
				        </p>

				        <div className="footer__item--content">
				            <NavLinkButton text={'Информация о ЕГЭ'} href={'info'} classMore="footer__item--link" />
				            <NavLinkButton text={'Разбор заданий'} href={'tasks'} classMore="footer__item--link" />
				            {isAuth && <NavLinkButton text={'Тесты'} href={'tests'} classMore="footer__item--link" />}
				        </div>
				    </div>

				    <div className="footer__item">
				        <p className="footer__item--title">
				            Социальные сети:
				        </p>

				        <Social className="footer__social" />
				    </div>
				</div>

				<p className="footer__copy">
				    &copy; ResEz 2021
				</p>
			</>}
		</footer>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		loadAuth: reqLoadAuth(state)
	}
}

export default connect(mapStateToProps, {})(Footer);