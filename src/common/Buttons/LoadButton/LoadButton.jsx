import React from 'react';

const LoadButton = ({margin = 4, width = false}) => {
	const classList = [`button disable mt${margin}${!width ? ' w100' : ''}`];

	return(
		<button className={classList}>
			Загрузка..
		</button>
	)
}

export default LoadButton;