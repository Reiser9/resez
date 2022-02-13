import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../../theme/gstyle.js';

import PreloaderFill from '../../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import LoadButtonMui from '../../../../common/Buttons/LoadButtonMui/LoadButtonMui.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Lvl from '../Lvl/Lvl.jsx';
import AvatarUser from '../AvatarUser/AvatarUser.jsx';
import DataBlock from './DataBlock/DataBlock.jsx';

import {checkPattern} from '../../../../redux/auth-reducer.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';
import {reqRole, reqName, reqSurname, reqNick, reqEditNickLoad, reqExp, reqLvl} from '../../../../redux/user-selectors.js';
import {setDeleteModal} from '../../../../redux/modal-reducer.js';

const Data = ({role, name, surname, nick, exp, lvl, editNickLoad, checkPattern, patternNotify, setDeleteModal}) => {
	const gstyle = useStyles();

	const [editData, setEditData] = React.useState(false); //Редактируем ли данные сейчас
	const [nameEdit, setNameEdit] = React.useState(""); //Записываем измененное имя
	const [surnameEdit, setSurnameEdit] = React.useState(""); //Записываем измененную фамилию
	const [nickEdit, setNickEdit] = React.useState(""); //Записываем измененный ник

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
			<Box className={`${gstyle.flexstart} ${gstyle.w100}`}>
				<AvatarUser />

				<Lvl exp={exp} lvl={lvl} />

				<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 1.5}}>
					<DataBlock title="Роль" data={role} canEdit={false} />

					<DataBlock title="Имя" editData={editData} data={name} dataEdit={nameEdit} setDataEdit={setNameEdit} />

					<DataBlock title="Фамилия" editData={editData} data={surname} dataEdit={surnameEdit} setDataEdit={setSurnameEdit} />

					<DataBlock title="Логин" editData={editData} data={nick} dataEdit={nickEdit} setDataEdit={setNickEdit} />
				</Box>
			</Box>

			<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 3}}>
				{editNickLoad
				? <LoadButtonMui className={gstyle.w100}>
					Загрузка..
				</LoadButtonMui>
				: <Button className={gstyle.w100} variant="contained" onClick={saveData}>
					{editData ? 'Сохранить' : 'Редактировать'}
				</Button>}

				<Button color="error" variant="contained" sx={{mt: 1}} className={gstyle.w100} onClick={() => setDeleteModal(true)}>
					Удалить аккаунт
				</Button>
			</Box>
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

export default connect(mapStateToProps, {checkPattern, patternNotify, setDeleteModal})(Data);