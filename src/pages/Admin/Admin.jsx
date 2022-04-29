import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

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
						<NavLinkMui variant="outlined" href="admin/notify" className={`${gstyle.flexsh} ${gstyle.link}`}>
							Уведомления
						</NavLinkMui>

						<NavLinkMui variant="outlined" href="admin/users" className={`${gstyle.flexsh} ${gstyle.link}`}>
							Пользователи
						</NavLinkMui>
					</Box>

					<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
						<Routes>
							<Route index element={<Navigate to={"notify"} />} />
							<Route path="notify" element={withSuspense(NotifyAdmin)} />
							<Route path="users" element={withSuspense(UsersAdmin)} />
							<Route path="*" element={<Navigate to={"/404"} />}/>
						</Routes>
					</Box>
				</DefaultWrapper>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

export default Admin;