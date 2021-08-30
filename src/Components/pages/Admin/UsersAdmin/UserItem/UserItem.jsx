import React from 'react';

import './UserItem.css';

import UsersData from '../UsersData/UsersData.jsx';
import Lvl from '../../../Profile/Lvl/Lvl.jsx';
import Button from '../../../../../common/Buttons/Button/Button.jsx';

const UserItem = ({img, email, name, surname, nick, uid, status, lvl, exp, role, balance, verificateEmail, sitecolor, privatProfile}) => {
	return(
		<div className="admin__users--item flexcenter">
			<div className="admin__user--img--inner">
				<img src={img ? img : '/assets/img/1.svg'} alt="Аватарка" className="user__img"/>
			</div>

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

			<div className="admin__user--data--wrapper flexstart mt1 w100">
				<p className="admin__user--data--title">
					Цветовая гамма:
				</p>

				<div className="admin__user--color mt1" style={{background: sitecolor}}></div>
			</div>

			<div className="flexstart w100 mt4">
				<Button text="Редактировать" margin={0} />

				<Button text="Уведомление" margin={1} />
			</div>
		</div>
	)
}

export default UserItem;