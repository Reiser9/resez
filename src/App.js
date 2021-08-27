import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';

import {initializedApp} from './redux/app-reducer.js';
import {reqInitApp, reqNotify, reqSitecolor} from './redux/user-selectors.js';

import Preloader from './common/Preloaders/Preloader/Preloader.jsx';
import Notify from './common/Notify/Notify.jsx';
import {withSuspense} from './hoc/withSuspense.js';
import Main from './Components/pages/Main/Main.jsx';
const Login = React.lazy(() => import('./Components/pages/Login/Login.jsx'));
const Register = React.lazy(() => import('./Components/pages/Register/Register.jsx'));
const Recovery = React.lazy(() => import('./Components/pages/Recovery/Recovery.jsx'));
const NotFound = React.lazy(() => import('./Components/pages/404/404.jsx'));
const Profile = React.lazy(() => import('./Components/pages/Profile/Profile.jsx'));
const NotifyPage = React.lazy(() => import('./Components/pages/Notify/Notify.jsx'));
const Sitecolor = React.lazy(() => import('./Components/pages/Sitecolor/Sitecolor.jsx'));
const Admin = React.lazy(() => import('./Components/pages/Admin/Admin.jsx'));

const App = ({initApp, initializedApp, notify, sitecolor}) => {
    React.useEffect(() => {
        initializedApp();
    }, [initializedApp]);

    React.useEffect(() => {
        document.documentElement.style.setProperty('--mainC', sitecolor);
    }, [sitecolor]);

    let notifyArr = Object.keys(notify).map((key) => {
        return notify[key];
    });

    if(!initApp){
        return <Preloader />
    }

    return(
        <div className="app">
            {notifyArr.length > 0
            && <div className="notify">
                {notifyArr.map((n, id) => <Notify key={id} title={n.title} text={n.text}
                notifyType={n.type} id={n.id} />)}
            </div>}

            <Switch>
                <Route exact path="/" render={() => withSuspense(Main)} />
                <Route exact path="/login" render={() => withSuspense(Login)} />
                <Route exact path="/register" render={() => withSuspense(Register)} />
                <Route exact path="/recovery" render={() => withSuspense(Recovery)} />
                <Route path="/profile" render={() => withSuspense(Profile)} />
                <Route path="/notify" render={() => withSuspense(NotifyPage)} />
                <Route path="/sitecolor" render={() => withSuspense(Sitecolor)} />
                <Route path="/admin" render={() => withSuspense(Admin)} />
                <Route exact path="/404" render={() => withSuspense(NotFound)} />
                <Route path="*" render={() => <Redirect to={"/404"} />}/>
            </Switch>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        initApp: reqInitApp(state),
        notify: reqNotify(state),
        sitecolor: reqSitecolor(state)
    }
}

export default connect(mapStateToProps, {initializedApp})(App);