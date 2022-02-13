import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

// Локальный инпут, без использования redux
const InputLocal = ({val, editSetData, editDataVal, placeholder = "", password = false}) => {
	const gstyle = useStyles();
	
	const [inputView, setInputView] = React.useState(false);

	React.useEffect(() => {
		editSetData(val);
	}, [val, editSetData]);

	const handleChange = ({target: {value}}) => {
		editSetData(value);
	}

	const remove = () => {
		editSetData("");
	}

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.inputInner}`}>
			<Box className={`${gstyle.w100} ${gstyle.inputWrapper}`}>
				<input onChange={handleChange} value={editDataVal} type={password ? inputView ? 'text' : 'password' : 'text'}
				className={`input form__input login__input${password ? ' input__password' : ''}`} placeholder={placeholder} />

				{editDataVal.length > 0 &&
				<Box className={gstyle.inputDelete}>
					<img onClick={remove} src="/assets/img/crossField.svg" alt="Удалить содержимое" className="input__delete--img" />

					{password && <img onClick={() => setInputView(prev => !prev)} src={inputView ? '/assets/img/noteye.svg' : '/assets/img/eye.svg'}
					alt="Посмотреть пароль" className="input__view--img" />}
				</Box>}
			</Box>
		</Box>
	)
}

export default InputLocal;