import React from 'react';
import {connect} from 'react-redux';

import {removeNotify} from '../../redux/notify-reducer.js';

const Notify = ({title, text, notifyType, id, removeNotify}) => {
	const remove = () => {
		removeNotify(id);
	}

	const removeClick = () => {
		clearTimeout(notifyTimeOut);
		remove();
	}

	let notifyTimeOut = setTimeout(remove, 1500);

	return(
		<div className={`notify__item ${notifyType}`} onClick={removeClick}>
		    <div className="notify__icon--inner">
		        <img src={`./assets/img/${notifyType}.svg`} className="notify__icon" alt="Иконка" />
		    </div>

		    <div className="notify__text--inner">
		        <p className="notify__text--title">
		            {title}
		        </p>

		        <p className="notify__text--text">
		            {text}
		        </p>
		    </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {removeNotify})(Notify);