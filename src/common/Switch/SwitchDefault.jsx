import React from 'react';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const SwitchDefault = ({text, dataEdit, setDataEdit}) => {
	const gstyle = useStyles();

	const onChange = () => {
		setDataEdit(!dataEdit);
	}

	return(
		<Box className={`${gstyle.w100} ${gstyle.flexDef}`}>
			<FormControlLabel control={<Switch checked={dataEdit} onChange={onChange} />} label={<Typography sx={{ml: .2}} component="p" variant="p">{text}</Typography>} />
		</Box>
	)
}

export default React.memo(SwitchDefault);