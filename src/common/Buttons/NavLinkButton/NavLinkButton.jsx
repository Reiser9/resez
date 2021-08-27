import React from 'react';
import {NavLink} from 'react-router-dom';

const NavLinkButton = ({text, href, activeClass = 'active', margin = 0, classMore = '', children, exact = false}) => {
	const classList = [`${classMore}`];

	return(
		<NavLink exact={exact} to={`/${href}`} activeClassName={activeClass} className={classList}>
			{text}
			{children}
		</NavLink>
	)
}

export default NavLinkButton;