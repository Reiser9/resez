import React from 'react';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';

import ProfileWrapper from '../../../../common/PageWrappers/ProfileWrapper/ProfileWrapper.jsx';
import StatusBox from './StatusBox/StatusBox.jsx';

const myStatuses = [
	{
		status: 'Новичок',
		message: 'Самый первый статус, дается за красивые глазки'
	},
	{
		status: 'Продвинутый',
		message: 'Разблокируется на 2-ом уровне'
	},
	{
		status: 'Профессионал',
		message: 'Разблокируется на 5-ом уровне'
	}
]

const allStatuses = [
	{
		status: 'Новичок',
		message: 'Самый первый статус, дается за красивые глазки'
	},
	{
		status: 'Продвинутый',
		message: 'Разблокируется на 2-ом уровне'
	},
	{
		status: 'Профессионал',
		message: 'Разблокируется на 5-ом уровне'
	},
	{
		status: 'Гуру',
		message: 'Разблокируется на 10-ом уровне'
	},
	{
		status: 'Мажор',
		message: 'Стоимость 50 рублей',
		price: 50
	},
	{
		status: 'Мозговой смерч',
		message: 'Решить 50 заданий'
	}
]

const ProfileStatus = () => {
	const gstyle = useStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Статус'
	}, []);

	return(
		<ProfileWrapper>
			<Box className={`${gstyle.w100} ${gstyle.flexbetstart} ${gstyle.wrap}`}>
				<StatusBox title="Ваши статусы" data={myStatuses} />

				<StatusBox title="Все статусы" data={allStatuses} />
			</Box>
		</ProfileWrapper>
	)
}

export default ProfileStatus;