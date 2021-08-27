import React from 'react';

import Sidebar from '../../../Components/Sidebar/Sidebar.jsx';
import Footer from '../../../Components/Footer/Footer.jsx';

const PageWrapper = ({children}) => {
	return(
		<>  
            <Sidebar />

            <div className="content">
                {children}

                <Footer />
            </div>
        </>
	)
}

export default PageWrapper;