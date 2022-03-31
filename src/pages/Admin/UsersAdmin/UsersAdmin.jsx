import React from 'react';
import {connect} from 'react-redux';

import './UsersAdmin.css';
import {useStyles} from '../../../theme/gstyle.js';

import {reqUsers, reqUsersValue, reqUsersInLoad} from '../../../redux/user-selectors.js';
import {getUsers, getUsersNumber} from '../../../redux/admin-reducer.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import UserItem from './UserItem/UserItem.jsx';

const UsersAdmin = ({users, usersValue, usersInLoad, getUsers, getUsersNumber}) => {
	const gstyle = useStyles();

	const [usersArr, setUsersArr] = React.useState([]);
	const [search, setSearch] = React.useState('');

	const handleChange = ({target: {value, id}}) => {
		switch(id){
			case 'searchUsers':
				setSearch(value);
				break;
			case 'changeUserInPage':
				getUsers(value);
				break;
			default:
				break;
		}
	}

	React.useEffect(() => {
		setUsersArr(Object.keys(users).map((key) => {
			return users[key];
		}));
	}, [users]);

	React.useEffect(() => {
		users.length === 0 && getUsers();
		!usersValue && getUsersNumber();
	}, [users, usersValue, getUsers, getUsersNumber]);

	React.useEffect(() => {
		document.title = 'ResEz - Админка пользователи';
	}, []);

	return(
		<Box className={`${gstyle.flexcenter} ${gstyle.w100}`}>
			<Box className={gstyle.w100}>
				<Box className={`${gstyle.flexbet} ${gstyle.w100}`} sx={{flexWrap: 'wrap'}}>
					<Box className="admin__users--search--inner">
						<input id="searchUsers" value={search} onChange={handleChange} className="input admin__users--search--input w100"
						type="text" placeholder="Поиск"/>

						<Box className="admin__users--search">
							<img src="/assets/img/search.svg" alt="Поиск" className="admin__users--search--icon" />
						</Box>
					</Box>

					<Typography component="p" variant="p" sx={{fontWeight: 700, width: {r680: 'auto', r0: '100%'}, mt: {r680: 0, r0: 1.5}}}>
						Всего пользователей: {usersValue ? usersValue : '0'}
					</Typography>

					<Box className="admin__users--filter">
						Показывать по:

						<select id="changeUserInPage" className="input admin__users--select" onChange={handleChange}>
							<option>5</option>
							<option>15</option>
							<option>50</option>
							<option>100</option>
						</select>
					</Box>
				</Box>

				{!usersInLoad ? usersArr.length === 0
				? <Typography component="div" variant="p" sx={{width: '100%', textAlign: 'center', mt: 2}}>
					Пользователей не найдено
				</Typography>
				: <Box className={gstyle.w100} sx={{mt: 3, display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(275px, 1fr))'}}>
					{usersArr?.map((u, id) => <UserItem key={id} data={u} />)}
				</Box>
				: <CircularProgress sx={{mt: 2}} />}
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		users: reqUsers(state),
		usersValue: reqUsersValue(state),
		usersInLoad: reqUsersInLoad(state)
	}
}

export default connect(mapStateToProps, {getUsers, getUsersNumber})(UsersAdmin);