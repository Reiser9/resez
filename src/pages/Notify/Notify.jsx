import React from 'react';
import {connect} from 'react-redux';

import {useStyles} from '../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import PreloaderFill from '../../common/Preloaders/PreloaderFill/PreloaderFill.jsx';
import PrivatePageWrapper from '../../common/PageWrappers/PrivatPageWrapper/PrivarPageWrapper.jsx';
import PageWrapper from '../../common/PageWrappers/PageWrapper/PageWrapper.jsx';

import NotifyItem from './NotifyItem/NotifyItem.jsx';

import {reqNotifyBase, reqLoadDataUser} from '../../redux/user-selectors.js';
import {compareTime} from '../../common/utils/sort.js';

const Notify = ({notifyBase, loadDataUser}) => {
	const gstyle = useStyles();

	const [notifyBaseArr, setNotifyBaseArr] = React.useState([]);
	
	React.useEffect(() => {
		setNotifyBaseArr(Object.keys(notifyBase).map((key) => {
			return notifyBase[key];
		}));
	}, [notifyBase]);

	React.useEffect(() => {
		document.title = 'ResEz - Уведомления';
	}, []);

	return(
		<PrivatePageWrapper>
			<PageWrapper>
				<Box className={`${gstyle.wrapper} ${gstyle.flexsh} ${gstyle.w100}`}>
					<Box className={`${gstyle.wrapperContent} ${gstyle.flexcenter} ${gstyle.w100}`}>
						{!loadDataUser
						? <Box className={gstyle.w100} sx={{display: 'grid', gap: 2}}>
							{notifyBaseArr.length > 0
							? notifyBaseArr?.sort(compareTime).map((d, id) => <NotifyItem key={id} data={d} />)
							: <Typography sx={{width: '100%', textAlign: 'center'}} component="div" variant="h5">
								Уведомлений нет
							</Typography>}
						</Box>
						: <PreloaderFill />}
					</Box>
				</Box>
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