import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';

// Локальное поле текста, без использования redux
const TextareaLocal = ({val, editSetData, editDataVal, placeholder = "", password = false}) => {
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
				<textarea onChange={handleChange} value={editDataVal} type={password ? inputView ? 'text' : 'password' : 'text'}
				className={`input form__input ${password ? ' input__password' : ''}`} placeholder={placeholder}></textarea>

				{editDataVal.length > 0 &&
				<Box className={`${gstyle.inputDelete} ${gstyle.inputTextarea}`}>
					<img onClick={remove} src="/assets/img/crossField.svg" alt="Удалить содержимое" className="input__delete--img" />

					{password && <img onClick={() => setInputView(prev => !prev)} src={inputView ? '/assets/img/noteye.svg' : '/assets/img/eye.svg'}
					alt="Посмотреть пароль" className="input__view--img" />}
				</Box>}
			</Box>
		</Box>
	)
}

export default TextareaLocal;