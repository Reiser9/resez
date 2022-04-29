import React from 'react';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PreloaderTop from '../../../common/Preloaders/PreloaderTop/PreloaderTop.jsx';
import LinkMui from '../../../common/Buttons/LinkMui/LinkMui.jsx';
import NavLinkMui from '../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

import {reqStatus, reqName, reqSurname, reqImg, reqLvl, reqBalance, reqRole, reqNotifyNotRead} from '../../../redux/user-selectors.js';

const useLocalStyles = makeStyles({
	imgInner: {
		width: 70,
		height: 70,
		background: '#007cee',
		borderRadius: '50%',
		overflow: 'hidden'
	},
	lvl: {
		width: 25,
		height: 25,
		borderRadius: '50%',
		fontSize: '1.4rem',
		background: 'var(--mainC)',
		marginLeft: 10
	}
});

const SidebarAuth = ({status, name, surname, img, lvl, balance, role, notifyNotRead}) => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	return(
	    <Box className={`${gstyle.flexstart} ${gstyle.sidebarContent} ${gstyle.sidebarComponent}`}>
	        <Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mb: 1, position: 'relative'}}>
	        	{name && surname
	        	? <>
	        		<Box className={`${gstyle.flex} ${gstyle.w100}`} sx={{mb: 1, p: '0 2rem'}}>
		        		<LinkMui href={'profile'} className={`${gstyle.flexsh} ${gstyle.flex} ${localStyle.imgInner}`} sx={{mr: 1}}>
		        		    <img src={img ? `/assets/img/${img}.svg` : "/assets/img/1.svg"} alt="Аватарка" className={gstyle.imgRes} />
		        		</LinkMui>

		        		<Box className={`${gstyle.flexstart} ${gstyle.w100}`}>
		        		    <Typography component="p" variant="p" sx={{wordBreak: 'break-all'}}>
		        		        {name + " " + surname[0] + "."}
		        		    </Typography>

		        		    <Typography component="p" variant="p2" color="greytext.main">
		        		        {status}
		        		    </Typography>
		        		</Box>

		        		<LinkMui href="profile/lvl" className={`${gstyle.flex} ${gstyle.flexsh} ${localStyle.lvl}`} sx={{color: '#fff'}}>
		        			{lvl}
		        		</LinkMui>
		        	</Box>

		        	<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{p: '0 2rem'}}>
		        		<Typography component="p" variant="p">
		        			Баланс: {balance} руб
		        		</Typography>

		        		<NavLinkMui href="payment" variant="outlined" className={gstyle.w100} sx={{mt: 1, p: '.5rem 2rem'}}>
		        			Пополнить
		        		</NavLinkMui>
		        	</Box>
	        	</>
	        	: <PreloaderTop />}
	        </Box>

	        <Box className={`${gstyle.flexstart} ${gstyle.w100}`}>
	        	{role === 'admin' && <LinkMui href="admin" className={`${gstyle.w100} ${gstyle.sidebarLink}`}>
	        		Админка
	        	</LinkMui>}

	        	<LinkMui href="profile" className={`${gstyle.w100} ${gstyle.sidebarLink}`}>
	        		Мой профиль
	        	</LinkMui>

	            <LinkMui href="notify" className={`${gstyle.w100} ${gstyle.sidebarLink}`} notify notifyNotRead={notifyNotRead}>
	            	Уведомления
	            </LinkMui>
	        </Box>
	    </Box>
	)
}

const mapStateToProps = (state) => {
	return{
		status: reqStatus(state),
		name: reqName(state),
		surname: reqSurname(state),
		img: reqImg(state),
		lvl: reqLvl(state),
		balance: reqBalance(state),
		role: reqRole(state),
		notifyNotRead: reqNotifyNotRead(state)
	}
}

export default connect(mapStateToProps, {})(SidebarAuth);