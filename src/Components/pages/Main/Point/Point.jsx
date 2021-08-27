import React from 'react';
import {connect} from 'react-redux';

import './Point.css';

import PreloaderFill from '../../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PointItem from './PointItem/PointItem.jsx';

import {reqIsAuth, reqDataIsLoad, reqPointTitle, reqPointSubtitle, reqPointItems} from '../../../../redux/user-selectors.js';

const Point = ({isAuth, dataIsLoad, pointTitle, pointSubtitle, pointItems}) => {
	return(
		<div className="point flexcenter w100">
			{dataIsLoad
			? <PreloaderFill />
			: <>
				<h2 className="title point__title w100">
				    {pointTitle}
				</h2>

				<p className="point__subtitle w100">
				    {pointSubtitle}
				</p>

				<div className="point__content w100">
					{Object.keys(pointItems).map((item, id) => <PointItem key={id} title={pointItems[item].title} text={pointItems[item].text}
					buttonText={pointItems[item].buttonText} link={pointItems[item].link} buttonAuth={pointItems[item].buttonAuth} />)}
				</div>
			</>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		dataIsLoad: reqDataIsLoad(state),
		pointTitle: reqPointTitle(state),
		pointSubtitle: reqPointSubtitle(state),
		pointItems: reqPointItems(state)
	}
}

export default connect(mapStateToProps, {})(Point);