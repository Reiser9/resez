import React from 'react';

import {useStyles} from '../../../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InputLocal from '../../../../../common/Inputs/InputLocal/InputLocal.jsx';
import DataValue from '../../../../../common/DataValue/DataValue.jsx';

// Заголовок, редактируются ли данные(да/нет), отображаемые данные, измененные данные в поле, функция изменения данных в поле,
// можно ли редактировать(например: роль нельзя)
const DataBlock = ({title, editData, data, dataEdit, setDataEdit, canEdit = true}) => {
	const gstyle = useStyles();

	return(
		<Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{mt: 1.5, '&:first-of-type': {mt: 0}}}>
			<Typography component="p" variant="p">
				{title}:
			</Typography>

			{canEdit ? editData
			? <InputLocal val={data} editSetData={setDataEdit} editDataVal={dataEdit} placeholder="Имя" />
			: <DataValue value={data} />
			: <DataValue value={data} />}
		</Box>
	)
}

export default React.memo(DataBlock);