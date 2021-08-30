import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './Info.css';

import {withSuspense} from '../../../hoc/withSuspense.js';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

const MainInfo = React.lazy(() => import('./MainInfo/MainInfo.jsx'));
const PointsInfo = React.lazy(() => import('./PointsInfo/PointsInfo.jsx'));
const UsefulInfo = React.lazy(() => import('./UsefulInfo/UsefulInfo.jsx'));

const Info = () => {
	return(
		<PageWrapper>
			<div className="wrapper flexsh w100">
				<div className="wrapper__content flexcenter w100">
					<div className="info__buttons--inner w100">
						<NavLinkButton href="info" exact text="Главная" classMore="button white__button info__button" />
						<NavLinkButton href="info/points" text="Шкала баллов" classMore="button white__button info__button" />
						<NavLinkButton href="info/useful" text="Полезные советы" classMore="button white__button info__button" />
					</div>

					<div className="flexcenter w100">
						<Switch>
							<Route exact path="/info" render={() => withSuspense(MainInfo)} />
							<Route exact path="/info/points" render={() => withSuspense(PointsInfo)} />
							<Route exact path="/info/useful" render={() => withSuspense(UsefulInfo)} />
							<Route path="/info/*" render={() => <Redirect to={"/404"} />}/>
						</Switch>
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}

export default Info;