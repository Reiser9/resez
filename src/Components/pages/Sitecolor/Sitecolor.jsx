import React from 'react';
import {connect} from 'react-redux';

import './Sitecolor.css';

import PreloaderFill from '../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import PrivatePageWrapper from '../../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';

import SitecolorItem from './SitecolorItem/SitecolorItem.jsx';

import {reqSitecolors} from '../../../redux/user-selectors.js';

const Sitecolor = ({sitecolors}) => {
	const sitecolorsArr = Object.keys(sitecolors).map((key) => {
		return sitecolors[key];
	});

	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<div className="wrapper flexsh w100">
					<div className="wrapper__content flexcenter w100">
						{sitecolorsArr.length > 0
						? <>
							<h2 className="pretitle">
								Цветовая гамма
							</h2>

							<div className="sitecolor__content w100 mt3">
								{sitecolorsArr.map((d, id) => <SitecolorItem key={id} name={d.name} hex={d.hex} />)}
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
		sitecolors: reqSitecolors(state)
	}
}

export default connect(mapStateToProps, {})(Sitecolor);