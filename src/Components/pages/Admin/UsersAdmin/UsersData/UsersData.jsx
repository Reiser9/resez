import React from 'react';

import './UsersData.css';

const UsersData = ({title, value, bool = false}) => {
	return(
		<div className="admin__user--data--wrapper flexstart mt1 w100">
			<p className="admin__user--data--title">
				{title}:
			</p>

			<p className="admin__user--data--value">
				{bool ? value === false ? 'Нет' : 'Да' : value}
			</p>
		</div>
	)
}

export default UsersData;