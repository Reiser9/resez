import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Sidebar from '../../../Components/Sidebar/Sidebar.jsx';
import Footer from '../../../Components/Footer/Footer.jsx';

const PageWrapper = ({children}) => {
    const gstyle = useStyles();
    
	return(
		<>  
            <Sidebar />

            <Box className={`${gstyle.flexstart} ${gstyle.w100}`} sx={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
                {children}

                <Footer />
            </Box>
        </>
	)
}

export default PageWrapper;