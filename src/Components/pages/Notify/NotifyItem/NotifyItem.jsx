import React from 'react';
import {connect} from 'react-redux';

import './NotifyItem.css';

import LoadButton from '../../../../common/Buttons/LoadButton/LoadButton.jsx';
import Button from '../../../../common/Buttons/Button/Button.jsx';

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
				? <Button text="Прочитано" widthAuto margin={0} classMore={'disable'} />
				: <>
					{readNotifyLoad
					? <LoadButton margin={0} width />
					: <Button text="Прочитать" widthAuto margin={0} onClick={readNotify} />}
					
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