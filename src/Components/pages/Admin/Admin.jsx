import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './Admin.css';

import {withSuspense} from '../../../hoc/withSuspense.js';

import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';

const MainAdmin = React.lazy(() => import('./MainAdmin/MainAdmin.jsx'));
const NotifyAdmin = React.lazy(() => import('./NotifyAdmin/NotifyAdmin.jsx'));
const UsersAdmin = React.lazy(() => import('./UsersAdmin/UsersAdmin.jsx'));

const Admin = () => {
	return(
		<PrivatePageWrapper admin={true}>
			<PageWrapper>
				<div className="admin__inner flexsh wrapper flexstart w100">
					<div className="wrapper__content flexcenter w100">
						<div className="admin__link--inner w100">
							<NavLinkButton text={'Главная'} href={'admin'} classMore={'button white__button admin__link'} exact={true} />
							<NavLinkButton text={'Уведомления'} href={'admin/notify'} classMore={'button white__button admin__link'} />
							<NavLinkButton text={'Пользователи'} href={'admin/users'} classMore={'button white__button admin__link'} />
						</div>

						<div className="flexcenter w100">
							<Switch>
								<Route exact path="/admin" render={() => withSuspense(MainAdmin)} />
								<Route exact path="/admin/notify" render={() => withSuspense(NotifyAdmin)} />
								<Route exact path="/admin/users" render={() => withSuspense(UsersAdmin)} />
								<Route path="/admin/*" render={() => <Redirect to={"/404"} />}/>
							</Switch>
						</div>
					</div>
				</div>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

export default Admin;