import React from 'react';

import ProfileWrapper from '../../../common/PageWrappers/ProfileWrapper/ProfileWrapper.jsx';

const ProfileLvl = () => {
	React.useEffect(() => {
		document.title = 'ResEz - Уровень'
	}, []);

	return(
		<ProfileWrapper>
			Уровень
		</ProfileWrapper>
	)
}

export default ProfileLvl;