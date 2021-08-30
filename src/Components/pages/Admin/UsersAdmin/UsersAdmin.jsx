import React from 'react';
import {connect} from 'react-redux';

import './UsersAdmin.css';

import {reqUsers} from '../../../../redux/user-selectors.js';

import UserItem from './UserItem/UserItem.jsx';

const UsersAdmin = ({users}) => {
	const [usersView, setUsersView] = React.useState(10);

	const usersViewChange = ({target: {value}}) => {
		setUsersView(value);
	}

	const usersArr = Object.keys(users).map((key) => {
		return users[key];
	});

	return(
		<>
			<h2 className="pretitle">
				Пользователи
			</h2>

			<div className="admin__users--content w100 mt1">
				<div className="admin__users--filter--inner flexbet w100">
					<div className="admin__users--search--inner">
						<input className="input admin__users--search--input w100" type="text" placeholder="Введите ник пользователя"/>

						<div className="admin__users--search">
							<img src="/assets/img/search.svg" alt="Поиск" className="admin__users--search--icon" />
						</div>
					</div>

					<p className="admin__users--count">
						{/*Всего пользователей: СДЕЛАТЬ!ХРАНИТЬ ЗНАЧЕНИЕ КОЛИЧЕСТВА ПОЛЬЗОВАТЕЛЕЙ ОТДЕЛЬНО В БАЗЕ ДАННЫХ*/}
					</p>

					<div className="admin__users--filter">
						Показывать:

						<select className="input admin__users--select" onChange={usersViewChange}>
							<option>10</option>
							<option>20</option>
							<option>Все</option>
						</select>
					</div>
				</div>

				<div className="admin__users--inner mt3 w100">
					{usersArr.map((u, id) => <UserItem key={id} sitecolor={u.sitecolor} name={u.name} surname={u.surname} lvl={u.lvl}
					status={u.status} exp={u.exp} uid={u.uid} role={u.role} nick={u.nick} email={u.email} verificateEmail={u.verificateEmail}
					balance={u.balance} privatProfile={u.privatProfile} />)}
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		users: reqUsers(state)
	}
}

export default connect(mapStateToProps, {})(UsersAdmin);