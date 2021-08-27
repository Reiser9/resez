import React from 'react';

import './Admin.css';

import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';

const Admin = () => {
	return(
		<PrivatePageWrapper admin={true}>
			<PageWrapper>
				<div className="admin__inner wrapper flexstart w100">
					<NavLinkButton text={'Главная'} href={'admin'} classMore={'button admin__link'} exact={true} />
					<NavLinkButton text={'Уведомления'} href={'admin/notify'} classMore={'button admin__link'} />
				</div>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

export default Admin;