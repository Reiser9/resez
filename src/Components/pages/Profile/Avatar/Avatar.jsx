import React from 'react';
import {connect} from 'react-redux';

import './Avatar.css';

import {reqImg, reqStatus} from '../../../../redux/user-selectors.js';

const Avatar = ({img, status}) => {
	return(
		<div className="profile__avatar--inner w100">
			<div className="profile__avatar--content">
				<img src={img ? `/assets/img/${img}.svg` : '/assets/img/1.svg'} alt="Аватарка" className="profile__avatar--img" />

				<div className="profile__avatar--edit">
					Изменить
				</div>
			</div>

			<div className="profile__avatar--status--inner flexstart w100">
				<div className="profile__avatar--status w100">
					{status}
				</div>

				<button className="button profile__status--edit--button w100">
					Изменить статус
				</button>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		img: reqImg(state),
		status: reqStatus(state)
	}
}

export default connect(mapStateToProps, {})(Avatar);