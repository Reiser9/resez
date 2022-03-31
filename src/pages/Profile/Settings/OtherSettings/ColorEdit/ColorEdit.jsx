import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PreloaderFill from '../../../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';

import {changeSitecolor} from '../../../../../redux/datasite-reducer.js';
import {reqSitecolor} from '../../../../../redux/user-selectors.js';

const ColorEdit = ({changeSitecolor, sitecolor}) => {
	const gstyle = useStyles();

	const [color, setColor] = React.useState('');

	React.useEffect(() => {
		setColor(sitecolor);
	}, [sitecolor]);

	const changeColor = (e) => {
		setColor(e.target.value);
	}

	const changeColorComplete = () => {
		changeSitecolor(color);
	}

	return(
		<>
			{color
			? <Box className={gstyle.w100} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',
			justifyContent: 'center'}}>
				<Typography className={gstyle.w100} variant="p" component="p">
					Цветовая гамма:
				</Typography>

				<Box className={`${gstyle.w100} ${gstyle.flexDef}`} sx={{mt: 1}}>
					<input type="color" value={color} onChange={changeColor} id="changeColor" className="color__select" />

					<label className="color__select--label" for="changeColor">
						Выбрать цвет
					</label>
				</Box>

				<Button disabled={sitecolor === color} onClick={changeColorComplete} sx={{mt: 1}} variant="contained">Применить</Button>
			</Box>
			: <PreloaderFill />}
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		sitecolor: reqSitecolor(state)
	}
}

export default connect(mapStateToProps, {changeSitecolor})(ColorEdit);