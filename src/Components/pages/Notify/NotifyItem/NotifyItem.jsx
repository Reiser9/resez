import React from 'react';
import {connect} from 'react-redux';

import './NotifyItem.css';

import LoadButton from '../../../../common/Buttons/LoadButton/LoadButton.jsx';

import {readNotifyUser} from '../../../../redux/notify-reducer.js';
import {reqReadNotifyLoad} from '../../../../redux/user-selectors.js';

const NotifyItem = ({title, text, date, read, id, readNotifyLoad, readNotifyUser}) => {
	const readNotify = () => {
		readNotifyUser(id);
	}

	return(
		<div className="notify__item flexstart w100">
			<div className="notify__item--title--inner flexbet w100">
				<p className="notify__item--title">
					{title}
				</p>

				<p className="notify__item--date">
					{date}
				</p>
			</div>

			<p className="notify__item--text w100 mt2">
				{text}
			</p>

			<div className="notify__read--inner flexbet w100 mt3">
				{read
				? <button className="notify__read--button button disable">
					Прочитано
				</button>
				: <>
					{readNotifyLoad
					? <LoadButton margin={0} />
					: <button className="notify__read--button button" onClick={readNotify}>
						Прочитать
					</button>}
					
					<div className="notify__indicator"></div>
				</>}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		readNotifyLoad: reqReadNotifyLoad(state)
	}
}

export default connect(mapStateToProps, {readNotifyUser})(NotifyItem);