import React from 'react';
import {connect} from 'react-redux';

import './Notify.css';

import PreloaderFill from '../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';

import NotifyItem from './NotifyItem/NotifyItem.jsx';

import {reqNotifyBase, reqLoadDataUser} from '../../../redux/user-selectors.js';

const Notify = ({notifyBase, loadDataUser}) => {
	const notifyBaseArr = Object.keys(notifyBase).map((key) => {
		return notifyBase[key];
	});

	// Сортируем уведомления по дате
	const compare = (a, b) => {
	    return (a.id > b.id) && -1;
	    return (a.id < b.id) && 1;
	    return 0;
	}

	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<div className="wrapper flexsh w100">
					<div className="wrapper__content flexcenter w100">
						{!loadDataUser
						? <>
							<h2 className="pretitle">
								Уведомления
							</h2>

							<div className="notify__content flexcenter w100">
								{notifyBaseArr.length > 0
								? notifyBaseArr.sort(compare).map((d, id) => <NotifyItem key={id} title={d.title} text={d.text} date={d.date} read={d.read} id={d.id} />)
								: 'Уведомлений нет'}
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
		notifyBase: reqNotifyBase(state),
		loadDataUser: reqLoadDataUser(state)
	}
}

export default connect(mapStateToProps, {})(Notify);