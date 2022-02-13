import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import {ChromePicker} from 'react-color';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import PreloaderFill from '../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';

import {changeSitecolor} from '../../../redux/datasite-reducer.js';
import {reqSitecolor} from '../../../redux/user-selectors.js';

const Sitecolor = ({changeSitecolor, sitecolor}) => {
	const gstyle = useStyles();

	const [color, setColor] = React.useState('');

	React.useEffect(() => {
		document.title = 'ResEz - Цветовая гамма';
	}, []);

	React.useEffect(() => {
		setColor(sitecolor);
	}, [sitecolor]);

	const changeColor = (color) => {
		setColor(color.hex);
	}

	const changeColorComplete = () => {
		changeSitecolor(color);
	}

	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<Box className={`${gstyle.wrapper} ${gstyle.flexsh} ${gstyle.w100}`}>
					<Box className={`${gstyle.wrapperContent} ${gstyle.flexcenter} ${gstyle.w100}`}>
						{color
						? <Box className={gstyle.w100} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',
						justifyContent: 'center'}}>
							<ChromePicker color={color} onChange={changeColor} disableAlpha={true} />

							<Button disabled={sitecolor === color} onClick={changeColorComplete} sx={{mt: 2}} variant="contained">Применить</Button>
						</Box>
						: <PreloaderFill />}
					</Box>
				</Box>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

const mapStateToProps = (state) => {
	return{
		sitecolor: reqSitecolor(state)
	}
}

export default connect(mapStateToProps, {changeSitecolor})(Sitecolor);