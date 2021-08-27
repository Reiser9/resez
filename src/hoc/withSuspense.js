import React from 'react';

import Preloader from '../common/Preloaders/Preloader/Preloader.jsx';

export const withSuspense = (Component) => {
    return(
        <React.Suspense fallback={<Preloader />}>
            <Component />
        </React.Suspense>
    );
}