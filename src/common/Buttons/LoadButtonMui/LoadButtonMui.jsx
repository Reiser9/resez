import React from 'react';

import Button from '@mui/material/Button';

const LoadButtonMui = ({text, children, ...props}) => {
	return(
		<Button variant="contained" disabled {...props}>
			{text}
			{children}
		</Button>
	)
}

export default LoadButtonMui;