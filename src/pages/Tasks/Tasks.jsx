import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {useStyles} from '../../theme/gstyle.js';

import {withSuspense} from '../../hoc/withSuspense.js';

import Box from '@mui/material/Box';

import PageWrapper from '../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import DefaultWrapper from '../../common/PageWrappers/DefaultWrapper/DefaultWrapper.jsx';
import NavLinkMui from '../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const Russian = React.lazy(() => import('./Russian/Russian.jsx'));
const Maths = React.lazy(() => import('./Maths/Maths.jsx'));

const Tasks = () => {
	const gstyle = useStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Разбор заданий ЕГЭ';
	}, []);
	
	return(
		<PageWrapper>
			<DefaultWrapper>
				<Box className={`${gstyle.linkInner} ${gstyle.w100}`}>
					<NavLinkMui variant="outlined" href="tasks/russian" className={`${gstyle.flexsh} ${gstyle.link}`}>
						Русский язык
					</NavLinkMui>

					<NavLinkMui variant="outlined" href="tasks/maths" className={`${gstyle.flexsh} ${gstyle.link}`}>
						Математика профиль
					</NavLinkMui>
				</Box>

				<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
					<Routes>
						<Route index element={<Navigate to={"russian"} />}/>
						<Route path="russian" element={withSuspense(Russian)} />
						<Route path="maths" element={withSuspense(Maths)} />
						<Route path="*" element={<Navigate to={"/404"} />}/>
					</Routes>
				</Box>
			</DefaultWrapper>
		</PageWrapper>
	)
}

export default Tasks;