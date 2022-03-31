import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PreloaderFill from '../../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PointItem from './PointItem/PointItem.jsx';

import {reqIsAuth, reqDataIsLoad, reqPointTitle, reqPointSubtitle, reqPointItems} from '../../../redux/user-selectors.js';

const Point = ({isAuth, dataIsLoad, pointTitle, pointSubtitle, pointItems}) => {
	const gstyle = useStyles();

	const [pointItemsArr, setPointItemsArr] = React.useState([]);

	React.useEffect(() => {
		setPointItemsArr(Object.keys(pointItems).map((key) => {
			return pointItems[key];
		}));
	}, [pointItems]);

	return(
		<Box sx={{p: {r1360: '5rem 6rem', r1200: '3rem', r0: '2rem'}, position: 'relative'}} className={`${gstyle.flexcenter} ${gstyle.w100}`}>
			{dataIsLoad
			? <PreloaderFill />
			: <>
				<Typography sx={{textAlign: 'center'}} component="h2" variant="h2">
				    {pointTitle}
				</Typography>

				<Typography sx={{mt: 1, textAlign: 'center'}} component="p" variant="h5">
				    {pointSubtitle}
				</Typography>

				<Box sx={{mt: 3, display: 'grid', gap: '30px', gridTemplateColumns: {r480: 'repeat(auto-fill, minmax(350px, 1fr))',
				r0: 'repeat(auto-fill, minmax(280px, 1fr))'}}}
				className={gstyle.w100}>
					{pointItemsArr?.map((d, id) => <PointItem key={id} data={d} />)}
				</Box>
			</>}
		</Box>
	)
}

const mapStateToProps = (state) => {
	return{
		isAuth: reqIsAuth(state),
		dataIsLoad: reqDataIsLoad(state),
		pointTitle: reqPointTitle(state),
		pointSubtitle: reqPointSubtitle(state),
		pointItems: reqPointItems(state)
	}
}

export default connect(mapStateToProps, {})(Point);