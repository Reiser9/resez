import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import {setData} from '../../../redux/auth-reducer.js';

import Box from '@mui/material/Box';

// id инпута, значение, пароль ли это или текстовое поле, изменить текст поля в redux, очистить поле в redux
const Input = ({id, value, placeholder = "", password = false, setData}) => {
	const gstyle = useStyles();
	
	const [inputView, setInputView] = React.useState(false);

	const handleChange = ({target: {id, value}}) => {
		setData(id, value);
	}

	const remove = ({target: {id}}) => {
		const tempId = id.replace('Remove', '');
		setData(tempId, '');
	}

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.inputInner} input__inner`}>
			<Box className={`${gstyle.w100} ${gstyle.inputWrapper} input__wrapper`}>
				<input id={id} onChange={handleChange} value={value} type={password ? inputView ? 'text' : 'password' : 'text'}
				className={`input form__input login__input${password ? ' input__password' : ''}`} placeholder={placeholder} />

				{value.length > 0 &&
				<Box className={gstyle.inputDelete}>
					<img id={id + 'Remove'} onClick={remove} src="/assets/img/crossField.svg" alt="Удалить содержимое"
					className="input__delete--img" />

					{password && <img onClick={() => setInputView(prev => !prev)} src={inputView ? '/assets/img/noteye.svg' : '/assets/img/eye.svg'}
					alt="Посмотреть пароль" className="input__view--img" />}
				</Box>}
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {setData})(React.memo(Input));