import React from 'react';
import {connect} from 'react-redux';

import {setData, setDataRemove} from '../../../redux/auth-reducer.js';

const Input = ({id, value, placeholder = "", password = false, setData, setDataRemove}) => {
	const [inputView, setInputView] = React.useState(false);

	const handleChange = ({target: {id, value}}) => {
		setData(id, value);
	}

	const remove = ({target: {id}}) => {
		setDataRemove(id, '');
	}

	return(
		<div className="input__inner">
			<div className="input__wrapper">
				<input id={id} onChange={handleChange} value={value} type={password ? inputView ? 'text' : 'password' : 'text'} className={`input form__input login__input${password ? ' input__password' : ''}`} placeholder={placeholder} />

				{value.length > 0 &&
				<div className="input__delete">
					<img id={id + 'Remove'} onClick={remove} src="./assets/img/crossField.svg" alt="Удалить содержимое" className="input__delete--img" />

					{password && <img onClick={() => setInputView(prev => !prev)} src={inputView ? './assets/img/noteye.svg' : './assets/img/eye.svg'} alt="Посмотреть пароль" className="input__view--img" />}
				</div>}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {setData, setDataRemove})(Input);