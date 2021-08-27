import React from 'react';

import Sidebar from '../../../Components/Sidebar/Sidebar.jsx';

const PageWrapperNotFooter = ({children}) => {
	return(
		<>  
            <Sidebar />

            <div className="content">
                {children}
            </div>
        </>
	)
}

const mapStateToProps = (state) => {
	return{
		
	}
}

export default PageWrapperNotFooter;