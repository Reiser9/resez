import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import './firebase/firebaseConfig.js';

import App from './App';

import store from './redux/redux-store.js';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store} >
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('app')
);