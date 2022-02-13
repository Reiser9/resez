import React from 'react';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import UsersData from '../UsersData/UsersData.jsx';
import Lvl from '../../../Profile/Lvl/Lvl.jsx';

const useLocalStyles = makeStyles({
	userItem: {
		justifyContent: 'space-between',
		borderRadius: 10,
		padding: '2.5rem 1.5rem',
		border: '1px solid var(--mainC)'
	},
	avatar: {
		width: 100,
		height: 100,
		marginBottom: '1.5rem',
		background: '#007CEE',
		borderRadius: '50%'
	}
});

const UserItem = ({data}) => {
	const {img, email, name, surname, nick, uid, status, lvl, exp, role, balance, verificateEmail, sitecolor, privatProfile} = data;

	const gstyle = useStyles();
	const localStyle = useLocalStyles();

	const [edit, setEdit] = React.useState(false);

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${localStyle.userItem}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100}`}>
				<Box className={`${gstyle.flex} ${localStyle.avatar}`}>
					<img src={img ? img : '/assets/img/1.svg'} alt="Аватарка" className={gstyle.imgRes}/>
				</Box>

				<Lvl exp={exp} lvl={lvl} />

				<UsersData title="Адрес электронной почты" value={email} />
				<UsersData title="Имя" value={name} />
				<UsersData title="Фамилия" value={surname} />
				<UsersData title="Логин" value={nick} />
				<UsersData title="ID" value={uid} />
				<UsersData title="Статус" value={status} />
				<UsersData title="Роль" value={role} />
				<UsersData title="Баланс" value={balance} />
				<UsersData title="Верифицирована почта" value={verificateEmail} bool={true} />
				<UsersData title="Приватный профиль" value={privatProfile} bool={true} />

				<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 1}}>
					<Typography component="p" variant="p2" color="greytext.main">
						Цветовая гамма:
					</Typography>

					<Box sx={{mt: 1, width: 30, height: 30, bgcolor: sitecolor, borderRadius: '50%'}}></Box>
				</Box>
			</Box>

			<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 3}}>
				<Button onClick={() => setEdit((e) => !e)} variant="contained" className={gstyle.w100} sx={{mt: 0}}>
					{edit ? 'Сохранить' : 'Редактировать'}
				</Button>

				<Button variant="contained" className={gstyle.w100} sx={{mt: 1}}>
					Уведомление
				</Button>

				<Button variant="contained" color="error" className={gstyle.w100} sx={{mt: 1}}>
					Заблокировать
				</Button>
			</Box>
		</Box>
	)
}

export default React.memo(UserItem);