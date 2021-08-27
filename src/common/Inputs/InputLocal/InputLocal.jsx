import React from 'react';

const InputLocal = ({val, editSetData, editDataVal, placeholder = "", password = false}) => {
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
		<div className="input__inner">
			<div className="input__wrapper">
				<input onChange={handleChange} value={editDataVal} type={password ? inputView ? 'text' : 'password' : 'text'} className={`input form__input login__input${password ? ' input__password' : ''}`} placeholder={placeholder} />

				{editDataVal.length > 0 &&
				<div className="input__delete">
					<img onClick={remove} src="./assets/img/crossField.svg" alt="Удалить содержимое" className="input__delete--img" />

					{password && <img onClick={() => setInputView(prev => !prev)} src={inputView ? './assets/img/noteye.svg' : './assets/img/eye.svg'} alt="Посмотреть пароль" className="input__view--img" />}
				</div>}
			</div>
		</div>
	)
}

export default InputLocal;