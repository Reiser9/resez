import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {useStyles} from '../../theme/gstyle.js';

import {withSuspense} from '../../hoc/withSuspense.js';

import Box from '@mui/material/Box';

import PageWrapper from '../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import DefaultWrapper from '../../common/PageWrappers/DefaultWrapper/DefaultWrapper.jsx';
import NavLinkMui from '../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const Russian = React.lazy(() => import('./Russian/Russian.jsx'));

const Tests = () => {
	const gstyle = useStyles();

	React.useEffect(() => {
		document.title = 'ResEz - Тесты';
	}, []);

	return(
		<PageWrapper>
			<DefaultWrapper>
				<Box className={`${gstyle.linkInner} ${gstyle.w100}`}>
					<NavLinkMui variant="outlined" href="tests/russian" className={`${gstyle.flexsh} ${gstyle.link}`}>
						Русский язык
					</NavLinkMui>

					<NavLinkMui variant="outlined" href="tests/maths" className={`${gstyle.flexsh} ${gstyle.link}`}>
						Математика профиль
					</NavLinkMui>
				</Box>

				<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
					<Routes>
						<Route index element={<Navigate to={"russian"} />}/>
						<Route path="russian" element={withSuspense(Russian)} />
						<Route path="*" element={<Navigate to={"/404"} />}/>
					</Routes>
				</Box>
			</DefaultWrapper>
		</PageWrapper>
	)
}

export default Tests;