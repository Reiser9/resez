import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

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
					<NavLinkMui variant="outlined" sx={{mr: 1}} href="tasks/russian" className={gstyle.flexsh}>
						Русский язык
					</NavLinkMui>

					<NavLinkMui variant="outlined" href="tasks/maths" className={gstyle.flexsh}>
						Математика профиль
					</NavLinkMui>
				</Box>

				<Box sx={{mt: 1}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
					<Switch>
						<Route exact path="/tasks" render={() => <Redirect to={"/tasks/russian"} />}/>
						<Route exact path="/tasks/russian" render={() => withSuspense(Russian)} />
						<Route exact path="/tasks/maths" render={() => withSuspense(Maths)} />
						<Route path="/tasks/*" render={() => <Redirect to={"/404"} />}/>
					</Switch>
				</Box>
			</DefaultWrapper>
		</PageWrapper>
	)
}

export default Tasks;