import React from 'react';
import {connect} from 'react-redux';

import './Data.css';

import PreloaderFill from '../../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import InputLocal from '../../../../common/Inputs/InputLocal/InputLocal.jsx';
import LoadButton from '../../../../common/Buttons/LoadButton/LoadButton.jsx';
import DataValue from '../../../../common/DataValue/DataValue.jsx';

import Lvl from '../Lvl/Lvl.jsx';
import Avatar from '../Avatar/Avatar.jsx';

import {deleteAccount, editUserDataInDatabase, checkAlreadyNick} from '../../../../redux/auth-reducer.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';
import {reqRole, reqName, reqSurname, reqNick, reqEditNickLoad, reqExp, reqLvl} from '../../../../redux/user-selectors.js';

const Data = ({role, name, surname, nick, exp, lvl, editNickLoad, deleteAccount, editUserDataInDatabase, checkAlreadyNick, patternNotify}) => {
	const [editData, setEditData] = React.useState(false); //Редактируем ли данные сейчас
	const [nameEdit, setNameEdit] = React.useState(""); //Записываем измененное имя
	const [surnameEdit, setSurnameEdit] = React.useState(""); //Записываем измененную фамилию
	const [nickEdit, setNickEdit] = React.useState(""); //Записываем измененный ник

	const checkPattern = (valEdit, val, error, success = false, fieldName = false, isNick = false) => {
		if(valEdit !== val){
			if(valEdit === '' || valEdit.length > 50){
				patternNotify(error);
			}
			else{
				if(!isNick){
					editUserDataInDatabase(fieldName, valEdit);
					patternNotify(success);
				}
				else{
					checkAlreadyNick(val, valEdit);
				}
			}
		}
	}

	const saveData = () => {
		setEditData(prev => !prev);
		if(editData){
			if(nameEdit === name && surnameEdit === surname && nickEdit === nick){
				patternNotify('data_not_edit');
			}
			else{
				checkPattern(nameEdit, name, 'name_empty_or_long', 'name_edied', 'name');
				checkPattern(surnameEdit, surname, 'surname_empty_or_long', 'surname_edied', 'surname');
				checkPattern(nickEdit, nick, 'nick_empty_or_long', false, false, true);
				setNameEdit(name);
				setSurnameEdit(surname);
				setNickEdit(nick);
			}
		}
	}

	if(!name){
		return <PreloaderFill />
	}

	return(
		<>
			<div className="profile__content--wrapper flexstart w100">
				<Avatar />

				<Lvl exp={exp} lvl={lvl} />

				<div className="profile__data--inner flexstart w100">
					<div className="profile__data--item flexstart w100">
						<p className="profile__data--item--name">
							Роль:
						</p>

						<DataValue value={role} />
					</div>

					<div className="profile__data--item flexstart w100">
						<p className="profile__data--item--name">
							Имя:
						</p>

						{editData
						? <InputLocal val={name} editSetData={setNameEdit} editDataVal={nameEdit} placeholder="Имя" />
						: <DataValue value={name} />}
					</div>

					<div className="profile__data--item flexstart w100">
						<p className="profile__data--item--name">
							Фамилия:
						</p>

						{editData
						? <InputLocal val={surname} editSetData={setSurnameEdit} editDataVal={surnameEdit} placeholder="Фамилия" />
						: <DataValue value={surname} />}
					</div>

					<div className="profile__data--item flexstart w100">
						<p className="profile__data--item--name">
							Логин:
						</p>

						{editData
						? <InputLocal val={nick} editSetData={setNickEdit} editDataVal={nickEdit} placeholder="Логин" />
						: <DataValue value={nick} />}
					</div>
				</div>
			</div>

			<div className="profile__content--button--inner flexstart w100">
				{editNickLoad
				? <LoadButton margin="0" />
				: <button className="button profile__content--button w100" onClick={saveData}>
					{editData ? 'Сохранить' : 'Редактировать'}
				</button>}

				<button className="button profile__content--button delete__account w100" onClick={deleteAccount}>
					Удалить аккаунт
				</button>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		role: reqRole(state),
		name: reqName(state),
		surname: reqSurname(state),
		nick: reqNick(state),
		editNickLoad: reqEditNickLoad(state),
		exp: reqExp(state),
		lvl: reqLvl(state)
	}
}

export default connect(mapStateToProps, {deleteAccount, editUserDataInDatabase, checkAlreadyNick, patternNotify})(Data);