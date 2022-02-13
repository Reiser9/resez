import React from 'react';
import {connect} from 'react-redux'

import {useStyles} from '../../../../theme/gstyle.js';

import {addNotifyAll, patternNotify} from '../../../../redux/notify-reducer.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLocal from '../../../../common/Inputs/InputLocal/InputLocal.jsx';
import TextareaLocal from '../../../../common/Inputs/TextareaLocal/TextareaLocal.jsx';

const NotifyAdmin = ({addNotifyAll, patternNotify}) => {
	const gstyle = useStyles();
	
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

	React.useEffect(() => {
		document.title = 'ResEz - Админка уведомления';
	}, []);

	return(
		<Box className={`${gstyle.flexcenter} ${gstyle.w100}`}>
			<Box className={`${gstyle.flexbet} ${gstyle.w100}`}>
				<Box className={gstyle.flexstart} sx={{width: {r1200: '48%', r998: '100%', r860: '48%', r0: '100%'}}}>
					<InputLocal val="" editSetData={setTitle} editDataVal={title} placeholder="Заголовок" />

					<TextareaLocal val="" editSetData={setText} editDataVal={text} placeholder="Текст" />

					<Button variant="contained" sx={{mt: 1}} onClick={addNotify}>
						Добавить
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{

	}
}

export default connect(mapStateToProps, {addNotifyAll, patternNotify})(NotifyAdmin);