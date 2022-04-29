import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {useStyles} from '../../theme/gstyle.js';

import {withSuspense} from '../../hoc/withSuspense.js';

import Box from '@mui/material/Box';

import PageWrapper from '../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import DefaultWrapper from '../../common/PageWrappers/DefaultWrapper/DefaultWrapper.jsx';
import NavLinkMui from '../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const PointsInfo = React.lazy(() => import('./PointsInfo/PointsInfo.jsx'));
const UsefulInfo = React.lazy(() => import('./UsefulInfo/UsefulInfo.jsx'));

const Info = () => {
	const gstyle = useStyles();

	return(
		<PageWrapper>
			<DefaultWrapper>
				<Box className={`${gstyle.linkInner} ${gstyle.w100}`}>
					<NavLinkMui variant="outlined" href="info/points" className={`${gstyle.flexsh} ${gstyle.link}`}>
						Шкала баллов
					</NavLinkMui>

					<NavLinkMui variant="outlined" href="info/useful" className={`${gstyle.flexsh} ${gstyle.link}`}>
						Полезные советы
					</NavLinkMui>
				</Box>

				<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
					<Routes>
						<Route index element={<Navigate to={"points"} />} />
						<Route path="points" element={withSuspense(PointsInfo)} />
						<Route path="useful" element={withSuspense(UsefulInfo)} />
						<Route path="*" element={<Navigate to={"/404"} />}/>
					</Routes>
				</Box>
			</DefaultWrapper>
		</PageWrapper>
	)
}

export default Info;