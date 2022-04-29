import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';

import {useStyles} from '../../../theme/gstyle.js';

import Timer from '../../../common/Timer/Timer.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import DefaultWrapper from '../../../common/PageWrappers/DefaultWrapper/DefaultWrapper.jsx';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLocal from '../../../common/Inputs/InputLocal/InputLocal.jsx';

const TestSingle = () => {
	const gstyle = useStyles();

	const {id} = useParams();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	}

	const [answer, setAnswer] = React.useState('');

	return(
		<PageWrapper>
			<DefaultWrapper>
				<Box className={`${gstyle.w100} ${gstyle.flexbetstart}`}>
					<Button variant="contained" onClick={goBack}>
						Назад
					</Button>

					<Timer hours={3} minutes={30} />
				</Box>

				<Box className={gstyle.w100} sx={{mt: 2}}>
					<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
						<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
							1 задание
						</Typography>

						<Typography component="h5" variant="h6" className={gstyle.title}>
							Укажите варианты ответов, в которых даны верные характеристики фрагмента текста. Запишите номера этих ответов. 
						</Typography>

						<Box className={`${gstyle.flexstart} ${gstyle.w100} ${gstyle.taskBox}`}>
							<Typography variant="p" component="p" className={gstyle.text}>
		        				1) Текст — в соответствии с особенностями академического подстиля — отличается грамматической усложненностью, которая проявляется по ряду параметров. Широко используются, например, отглагольные существительные на —ие/-ние и на -ия/ -ция: обучение, внедрение, представление, усвоение.
		        			</Typography>

		        			<Typography variant="p" component="p" className={gstyle.text}>
		        				2) Текст характеризуется точностью изложения информации. Это достигается за счет использования специальных лингвистических терминов: язык, языковые средства, речь, коммуникативная задача и других; кроме того, используются слова, которые можно считать межнаучными (используются в ряде гуманитарных наук — лингвистике, психологии, социологии).
		        			</Typography>

		        			<Typography variant="p" component="p" className={gstyle.text}>
		        				3) Широко употребляются в тексте слова в переносном значении, устаревшие слова, диалектизмы, просторечия.
		        			</Typography>

		        			<Typography variant="p" component="p" className={gstyle.text}>
		        				4) Тексту присущи сдержанность и строгость тона, безэмоциональность изложения. Используемые в тексте слова имеют либо нейтральную, либо книжную стилистическую окраску. Сниженная разговорная лексика, жаргонизмы отсутствуют.
		        			</Typography>

		        			<Typography variant="p" component="p" className={gstyle.text}>
		        				5) Логичность изложения обеспечивается активным использованием слов и фраз, выполняющих связующую и оформляющую функцию: для установления причинно-следственных отношений между фразами используются элементы «в связи с этим», «вот почему», «при этом».
		        			</Typography>
						</Box>

						<Box className={`${gstyle.answerInner} ${gstyle.flexDef}`}>
							<InputLocal val="" editDataVal={answer} editSetData={setAnswer} placeholder="1 задание" />
						</Box>
					</Box>

					<Box className={`${gstyle.w100} ${gstyle.flexstart} ${gstyle.taskItem}`}>
						<Typography variant="p" component="p" color="white.main" className={gstyle.tasksItemNumber}>
							2 задание
						</Typography>

						<Typography component="h5" variant="h6" className={gstyle.title}>
							Самостоятельно подберите определительное местоимение, которое должно стоять на месте пропуска во втором предложении текста. Запишите это местоимение.
						</Typography>

						<Box className={`${gstyle.answerInner} ${gstyle.flexDef}`}>
							<InputLocal val="" editDataVal={answer} editSetData={setAnswer} placeholder="2 задание" />
						</Box>
					</Box>
				</Box>
			</DefaultWrapper>
		</PageWrapper>
	)
}

export default TestSingle;