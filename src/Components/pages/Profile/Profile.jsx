import React from 'react';

import './Profile.css';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';

import Data from './Data/Data.jsx';
import Settings from './Settings/Settings.jsx';

const Profile = () => {
	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<div className="wrapper profile__inner flexsh w100">
					<div className="profile__content flexstart w100">
						<Data />
					</div>

					<div className="profile__settings flexstart w100">
						<Settings />
					</div>
				</div>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

export default Profile;