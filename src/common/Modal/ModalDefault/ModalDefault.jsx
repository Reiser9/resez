import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Обычная модалка, заголовок, текст кнопки закрытия, текст кнопки взаимодействия, сама функция действия, закрыть
const ModalDefault = ({title, textCanselButton = "Отмена", textEventButton, onClick, cansel, open}) => {
	const gstyle = useStyles();
	
	return(
		<Modal open={open} onClose={cansel} className={`${gstyle.flex} ${gstyle.modal}`}>
			<Box className={`${gstyle.flexcenter} ${gstyle.w100} ${gstyle.modalInner}`}>
				<Typography component="p" variant="h5" sx={{fontWeight: 600}} className={gstyle.textCenter}>
					{title}
				</Typography>

				<Box className={`${gstyle.flex} ${gstyle.w100}`} sx={{mt: 2}}>
					<Button onClick={cansel} variant="outlined" sx={{mr: 2}}>
						{textCanselButton}
					</Button>

					<Button onClick={onClick} variant="contained" color="error">
						{textEventButton}
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default ModalDefault;