import React from 'react';
import {Link} from 'react-router-dom';

import './Logo.css';

const Logo = () => {
	return(
		<Link to={'/'} className="logo__abs">
			ResEz
		</Link>
	)
}

export default Logo;