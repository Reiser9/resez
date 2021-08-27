import React from 'react';

const Button = ({text, onClick = false, margin = 4, widthAuto = false, white = false, classMore = ''}) => {
	const classList = [`button${white ? ' white__button' : ''} mt${margin}${!widthAuto ? ' w100' : ''} ${classMore}`];

	return(
		<>
			{onClick
			? <button className={classList} onClick={onClick}>
				{text}
			</button>
			: <button className={classList}>
				{text}
			</button>}
		</>
	)
}

export default Button;