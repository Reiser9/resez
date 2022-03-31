import React from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import BanImg from '../../assets/img/BanImg.jsx';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {quitUser} from '../../redux/auth-reducer.js';

const UserBan = ({quitUser}) => {
	const gstyle = useStyles();
	const history = useHistory();

	React.useEffect(() => {
		history.push('/');
	}, [history]);

	React.useEffect(() => {
		document.title = 'ResEz - Вы заблокированы';
	}, []);

	return(
		<Box sx={{minHeight: '100vh', p: 2}} className={`${gstyle.flex} ${gstyle.w100}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100}`}>
				<Box sx={{width: {r860: '645px', r0: '80%'}}}>
					<BanImg />
				</Box>

				<Typography component="h3" variant="h3" className={gstyle.w100} sx={{mt: {r1200: 5, r0: 3}, textAlign: 'center'}}>
					Ваш аккаунт заблокирован
				</Typography>

				<Button onClick={() => quitUser(true)} variant="contained" sx={{mt: 1.5, p: '1rem 4rem'}}>
					Выйти
				</Button>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {quitUser})(UserBan);