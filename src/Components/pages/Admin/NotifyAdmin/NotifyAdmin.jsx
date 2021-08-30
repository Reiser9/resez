import React from 'react';
import {connect} from 'react-redux'

import './NotifyAdmin.css';

import {addNotifyAll, patternNotify} from '../../../../redux/notify-reducer.js';

import InputLocal from '../../../../common/Inputs/InputLocal/InputLocal.jsx';
import TextareaLocal from '../../../../common/Inputs/TextareaLocal/TextareaLocal.jsx';
import Button from '../../../../common/Buttons/Button/Button.jsx';

const NotifyAdmin = ({addNotifyAll, patternNotify}) => {
	const [title, setTitle] = React.useState('');
	const [text, setText] = React.useState('');

	const addNotify = () => {
		if(title === ''){
			patternNotify('title_empty');
		}
		else if(text === ''){
			patternNotify('text_empty');
		}
		else{
			addNotifyAll(title, text);
			setTitle('');
			setText('');
		}
	}

	return(
		<>
			<h2 className="pretitle">
				Уведомления
			</h2>

			<div className="admin__notify--content flexbet w100 mt2">
				<div className="admin__notify--item flexstart">
					<InputLocal val="" editSetData={setTitle} editDataVal={title} placeholder="Заголовок" />

					<TextareaLocal val="" editSetData={setText} editDataVal={text} placeholder="Текст" />

					<Button text="Добавить" widthAuto margin={1} onClick={addNotify} />
				</div>
			</div>
		</>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {addNotifyAll, patternNotify})(NotifyAdmin);