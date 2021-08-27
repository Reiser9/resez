import React from 'react';
import {connect} from 'react-redux';

import './Notify.css';

import PreloaderFill from '../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';

import NotifyItem from './NotifyItem/NotifyItem.jsx';

import {reqNotifyBase} from '../../../redux/user-selectors.js';

const Notify = ({notifyBase}) => {
	const notifyBaseArr = Object.keys(notifyBase).map((key) => {
		return notifyBase[key];
	});

	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<div className="wrapper flexsh w100">
					<div className="wrapper__content flexcenter w100">
						{notifyBaseArr.length > 0
						? <>
							<h2 className="pretitle">
								Уведомления
							</h2>

							<div className="notify__content flexstart w100">
								{notifyBaseArr.map((d, id) => <NotifyItem key={id} title={d.title} text={d.text} date={d.date} read={d.read} id={d.id} />)}
							</div>
						</>
						: <PreloaderFill />}
					</div>
				</div>
			</PageWrapper>
		</PrivatePageWrapper>
	)
}

const mapStateToProps = (state) => {
	return{
		notifyBase: reqNotifyBase(state)
	}
}

export default connect(mapStateToProps, {})(Notify);