import React from 'react';

import ProfileWrapper from '../../../../common/PageWrappers/ProfileWrapper/ProfileWrapper.jsx';

const ProfileAvatar = () => {
	React.useEffect(() => {
		document.title = 'ResEz - Аватарка'
	}, []);

	return(
		<ProfileWrapper>
			Аватар
		</ProfileWrapper>
	)
}

export default ProfileAvatar;