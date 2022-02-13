import React from 'react';
import {makeStyles} from '@mui/styles';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withSuspense} from '../../../hoc/withSuspense.js';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';
import NavLinkMui from '../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const ProfilePage = React.lazy(() => import('./ProfilePage/ProfilePage.jsx'));
const ProfileAvatar = React.lazy(() => import('./ProfileAvatar/ProfileAvatar.jsx'));
const ProfileStatus = React.lazy(() => import('./ProfileStatus/ProfileStatus.jsx'));
const ProfileLvl = React.lazy(() => import('./ProfileLvl/ProfileLvl.jsx'));

const useLocalStyles = makeStyles(theme => ({
	filledContainer: {
		background: theme.palette.lightblue.main,
		padding: 20,
		borderRadius: 15,
		'@media (max-width: 500px)': {
		    borderRadius: 0
		}
	}
}));

const Profile = () => {
	const gstyle = useStyles();
	const localStyle = useLocalStyles();
	
	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<Box sx={{padding: {r1700: '6rem', r1260: '4rem', r500: '2rem', r0: '6rem 0 0 0'}}}
				className={`${gstyle.wrapper} ${gstyle.flexsh} ${gstyle.w100} ${gstyle.flexstart}`}>
					<Box className={`${gstyle.linkInner} ${gstyle.w100} ${localStyle.filledContainer}`}>
						<NavLinkMui variant="outlined" sx={{mr: 1}} exact href="profile" className={gstyle.flexsh}>
							Главная
						</NavLinkMui>

						<NavLinkMui variant="outlined" sx={{mr: 1}} href="profile/avatar" className={gstyle.flexsh}>
							Аватарка
						</NavLinkMui>

						<NavLinkMui variant="outlined" sx={{mr: 1}} href="profile/status" className={gstyle.flexsh}>
							Статус
						</NavLinkMui>

						<NavLinkMui variant="outlined" href="profile/lvl" className={gstyle.flexsh}>
							Уровень
						</NavLinkMui>
					</Box>

					<Box sx={{height: '100%', mt: 2}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
						<Switch>
							<Route exact path="/profile" render={() => withSuspense(ProfilePage)} />} />
							<Route exact path="/profile/avatar" render={() => withSuspense(ProfileAvatar)} />
							<Route exact path="/profile/status" render={() => withSuspense(ProfileStatus)} />
							<Route exact path="/profile/lvl" render={() => withSuspense(ProfileLvl)} />
							<Route path="/info/*" render={() => <Redirect to={"/404"} />}/>
						</Switch>
					</Box>
				</Box>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

export default Profile;