import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

import store from './redux/redux-store.js';
import './firebase/firebaseConfig.js';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}>
                    <App />
                </GoogleReCaptchaProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);