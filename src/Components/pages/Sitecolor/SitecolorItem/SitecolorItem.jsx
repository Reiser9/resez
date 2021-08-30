import React from 'react';
import {connect} from 'react-redux';

import {changeSitecolor} from '../../../../redux/datasite-reducer.js';
import {reqSitecolor} from '../../../../redux/user-selectors.js';

const SitecolorItem = ({name, hex, sitecolor, changeSitecolor}) => {
	const chooseColor = () => {
		hex !== sitecolor && changeSitecolor(hex);
	}

	return(
		<div className="sitecolor__item active" style={{border: `1px solid ${hex}`}} onClick={chooseColor}>
			<div className="sirecolor__color" style={{background: hex}}></div>

			<p className="sitecolor__color--name mt1">
				{name}
			</p>

			{hex === sitecolor
			&& <div className="sitecolor__item--active">
				<img src="/assets/img/check.svg" alt="Выбрано" className="sitecolor__item--active--img" />
			</div>}
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		sitecolor: reqSitecolor(state)
	}
}

export default connect(mapStateToProps, {changeSitecolor})(SitecolorItem);