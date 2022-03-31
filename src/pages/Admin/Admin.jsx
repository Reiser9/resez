import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {useStyles} from '../../theme/gstyle.js';

import {withSuspense} from '../../hoc/withSuspense.js';

import Box from '@mui/material/Box';

import PrivatePageWrapper from '../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';
import PageWrapper from '../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import DefaultWrapper from '../../common/PageWrappers/DefaultWrapper/DefaultWrapper.jsx';
import NavLinkMui from '../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const NotifyAdmin = React.lazy(() => import('./NotifyAdmin/NotifyAdmin.jsx'));
const UsersAdmin = React.lazy(() => import('./UsersAdmin/UsersAdmin.jsx'));

const Admin = () => {
	const gstyle = useStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Админка';
	}, []);
	
	return(
		<PrivatePageWrapper admin={true}>
			<PageWrapper>
				<DefaultWrapper>
					<Box className={`${gstyle.linkInner} ${gstyle.w100}`}>
						<NavLinkMui variant="outlined" href="admin/notify" sx={{mr: 1}} className={gstyle.flexsh}>
							Уведомления
						</NavLinkMui>

						<NavLinkMui variant="outlined" href="admin/users" className={gstyle.flexsh}>
							Пользователи
						</NavLinkMui>
					</Box>

					<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
						<Switch>
							<Route exact path="/admin" render={() => <Redirect to={"admin/notify"} />} />
							<Route exact path="/admin/notify" render={() => withSuspense(NotifyAdmin)} />
							<Route exact path="/admin/users" render={() => withSuspense(UsersAdmin)} />
							<Route path="/admin/*" render={() => <Redirect to={"/404"} />}/>
						</Switch>
					</Box>
				</DefaultWrapper>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

export default Admin;