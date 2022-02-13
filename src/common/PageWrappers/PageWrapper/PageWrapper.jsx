import React from 'react';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Sidebar from '../../../Components/Sidebar/Sidebar.jsx';
import Footer from '../../../Components/Footer/Footer.jsx';

// Шаблон страницы
const PageWrapper = ({children, footer = true}) => {
    const gstyle = useStyles();
    
	return(
		<>  
            <Sidebar />

            <Box className={`${gstyle.flexstart} ${gstyle.w100} content`} sx={{height: '100vh', overflowY: 'auto', overflowX: 'hidden'}}>
                {children}

                {footer && <Footer />}
            </Box>
        </>
	)
}

export default PageWrapper;