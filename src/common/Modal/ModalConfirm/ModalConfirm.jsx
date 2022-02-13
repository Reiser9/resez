import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import {patternNotify} from '../../../redux/notify-reducer.js';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Модалка с подтверждением, заголовок, подтверждающее слово, текст кнопки закрытия, текст кнопки взаимодействия, сама функция действия, закрыть
const ModalConfirm = ({title, confirmWord, textCanselButton = "Отмена", textEventButton, onClick, cansel, patternNotify, open}) => {
	const gstyle = useStyles();
	
	const [confirmWordInput, setConfirmWordInput] = React.useState('');

	const handleChange = ({target: {value}}) => {
		setConfirmWordInput(value);
	}

	const onClickConfirm = () => {
		if(confirmWord === confirmWordInput){
			onClick();
		}
		else{
			patternNotify('wrong_confirm_word');
		}
	}

	return(
		<Modal open={open} onClose={cansel} className={`${gstyle.flex} ${gstyle.modal}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.modalInner}`}>
				<Typography component="p" variant="h5" sx={{fontWeight: 600}} className={gstyle.textCenter}>
					{title}
				</Typography>

				<Typography component="p" variant="p" sx={{mt: .5}} className={gstyle.textCenter}>
					Для подтверждения действия впишите в поле ниже слово “{confirmWord}”
				</Typography>

				<Box className={gstyle.w100} sx={{maxWidth: 350, mt: 1}}>
					<input className="input w100 modal__input" value={confirmWordInput} onChange={handleChange} />
				</Box>

				<Box className={`${gstyle.flex} ${gstyle.w100}`} sx={{mt: 2}}>
					<Button onClick={cansel} variant="outlined" sx={{mr: 2}}>
						{textCanselButton}
					</Button>

					<Button onClick={onClickConfirm} variant="contained">
						{textEventButton}
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default connect(mapStateToProps, {patternNotify})(ModalConfirm);