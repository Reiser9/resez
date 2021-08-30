import React from 'react';
import {NavLink} from 'react-router-dom';

const NavLinkButton = ({text, href, activeClass = 'active', margin = 0, classMore = '', children, exact = false, notify = false, notifyNotRead = 0}) => {
	const classList = `${classMore}`;

	return(
		<NavLink exact={exact} to={`/${href}`} activeClassName={activeClass} className={classList}>
			{text}
			{children}

			{notify && notifyNotRead > 0 && <span className="notify__index">{notifyNotRead}</span>}
		</NavLink>
	)
}

export default NavLinkButton;