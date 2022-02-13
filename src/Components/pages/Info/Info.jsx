import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {useStyles} from '../../../theme/gstyle.js';

import {withSuspense} from '../../../hoc/withSuspense.js';

import Box from '@mui/material/Box';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import DefaultWrapper from '../../../common/PageWrappers/DefaultWrapper/DefaultWrapper.jsx';
import NavLinkMui from '../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';

const PointsInfo = React.lazy(() => import('./PointsInfo/PointsInfo.jsx'));
const UsefulInfo = React.lazy(() => import('./UsefulInfo/UsefulInfo.jsx'));

const Info = () => {
	const gstyle = useStyles();

	return(
		<PageWrapper>
			<DefaultWrapper>
				<Box className={`${gstyle.linkInner} ${gstyle.w100}`}>
					<NavLinkMui variant="outlined" sx={{mr: 1}} href="info/points" className={gstyle.flexsh}>
						Шкала баллов
					</NavLinkMui>

					<NavLinkMui variant="outlined" href="info/useful" className={gstyle.flexsh}>
						Полезные советы
					</NavLinkMui>
				</Box>

				<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
					<Switch>
						<Route exact path="/info" render={() => <Redirect to={"/info/points"} />} />
						<Route exact path="/info/points" render={() => withSuspense(PointsInfo)} />
						<Route exact path="/info/useful" render={() => withSuspense(UsefulInfo)} />
						<Route path="/info/*" render={() => <Redirect to={"/404"} />}/>
					</Switch>
				</Box>
			</DefaultWrapper>
		</PageWrapper>
	)
}

export default Info;