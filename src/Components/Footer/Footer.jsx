import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PreloaderFill from '../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import Social from '../../common/Social/Social.jsx';
import LinkMui from '../../common/Buttons/LinkMui/LinkMui.jsx';

import {reqIsAuth, reqLoadAuth} from '../../redux/user-selectors.js';

const useLocalStyles = makeStyles({
	footerItem: {
		'@media (max-width: 500px)': {
		    marginTop: "4rem",
		    '&:first-child': {
		    	marginTop: 0
		    }
		},
	},
	link: {
		'&:first-child': {
			marginTop: 0
		},
		'&:hover': {
			color: '#989898'
		}
	}
});

const Footer = ({isAuth, loadAuth}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{position: 'relative', bgcolor: '#303030', p: {r620: '5rem 6rem',
		r500: '4rem 3rem', r0: '2rem'}}}>
			{loadAuth
			? <PreloaderFill />
			: <>
				<Box className={`${gstyle.flexbetstart} ${gstyle.w100}`} sx={{flexDirection: {r500: 'row', r0: 'column'}}}>
				    <Box className={`${gstyle.flexstart} ${localStyle.footerItem}`}>
				        <Typography component="p" variant="h4" sx={{color: '#fff'}}>
				            Экзамены:
				        </Typography>

				        <Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 2}}>
				            <LinkMui href="info" className={localStyle.link} sx={{color: '#fff', mt: 1}}>
				            	Информация о ЕГЭ
				            </LinkMui>

				            <LinkMui href="tasks" className={localStyle.link} sx={{color: '#fff', mt: 1}}>
				            	Разбор заданий
				            </LinkMui>

				            {isAuth && <LinkMui href="tests" className={localStyle.link} sx={{color: '#fff', mt: 1}}>
				            	Тесты
				        	</LinkMui>}
				        </Box>
				    </Box>

				    <Box className={`${gstyle.flexstart} ${localStyle.footerItem}`}>
				        <Typography component="p" variant="h4" sx={{color: '#fff'}}>
				            Социальные сети:
				        </Typography>

				        <Box className={gstyle.w100} sx={{mt: 2}}>
				        	<Social />
				        </Box>
				    </Box>
				</Box>

				<Typography component="p" variant="p2" sx={{mt: 4, color: 'copy.main'}}>
				    &copy; ResEz 2021
				</Typography>
			</>}
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		loadAuth: reqLoadAuth(state)
	}
}

export default connect(mapStateToProps, {})(Footer);