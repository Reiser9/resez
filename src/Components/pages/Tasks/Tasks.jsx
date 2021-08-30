import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import './Tasks.css';

import {withSuspense} from '../../../hoc/withSuspense.js';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import NavLinkButton from '../../../common/Buttons/NavLinkButton/NavLinkButton.jsx';

const Tasks = () => {
	return(
		<PageWrapper>
			<div className="wrapper flexsh w100">
				<div className="wrapper__content flexcenter w100">
					<div className="info__buttons--inner w100">
						<NavLinkButton href="tasks" exact text="Главная" classMore="button white__button info__button" />
						<NavLinkButton href="tasks/russian" text="Русский язык" classMore="button white__button info__button" />
						<NavLinkButton href="tasks/math" text="Математика" classMore="button white__button info__button" />
					</div>

					<div className="flexcenter w100">
						<Switch>
							<Route path="/tasks/*" render={() => <Redirect to={"/404"} />}/>
						</Switch>
					</div>
				</div>
			</div>
		</PageWrapper>
	)
}

export default Tasks;