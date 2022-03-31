import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import SwitchDefault from '../../../../common/Switch/SwitchDefault.jsx';

import {reqPrivatProfile} from '../../../../redux/user-selectors.js';
import {editUserDataInDatabase} from '../../../../redux/auth-reducer.js';
import {patternNotify} from '../../../../redux/notify-reducer.js';

import ColorEdit from './ColorEdit/ColorEdit.jsx';

const OtherSettings = ({privatProfile, editUserDataInDatabase, patternNotify}) => {
	const gstyle = useStyles();

	const [privatProfileEdit, setPrivatProfileEdit] = React.useState(true);
	const [dataChanged, setDataChanged] = React.useState(false);

	React.useEffect(() => {
		setPrivatProfileEdit(privatProfile);
	}, [privatProfile]);

	React.useEffect(() => {
		setDataChanged(privatProfile === privatProfileEdit ? false : true);
	}, [privatProfileEdit, privatProfile]);

	const changeSettings = () => {
		editUserDataInDatabase('privatProfile', privatProfileEdit);
		patternNotify('data_changed');
	}

	return(
		<>
			<Box className={`${gstyle.w100} ${gstyle.flexstart}`} sx={{mt: 2}}>
				<ColorEdit />
			</Box>

			<Box className={`${gstyle.w100} ${gstyle.flexstart}`} sx={{mt: 2}}>
				<SwitchDefault text="Приватный профиль" dataEdit={privatProfileEdit} setDataEdit={setPrivatProfileEdit} />
			</Box>

			<Box className={`${gstyle.w100} ${gstyle.flex}`} sx={{mt: 1}}>
				<Button disabled={!dataChanged} variant="contained" onClick={changeSettings}>
					Сохранить
				</Button>
			</Box>
		</>
	)
}

const mapStateToProps = (state) => {
	return{
		privatProfile: reqPrivatProfile(state)
	}
}

export default connect(mapStateToProps, {editUserDataInDatabase, patternNotify})(OtherSettings);