import React from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';

const NavLinkMui = ({href = '', exact = false, text, children, variant = 'contained', ...props}) => {
	return(
		<Button variant={variant} exact component={NavLink} to={`/${href}`} {...props}>
			{text}
			{children}
		</Button>
	)
}

export default NavLinkMui;