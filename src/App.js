import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {makeStyles} from '@mui/styles';
import {createTheme} from '@mui/material/styles';

import './App.css';
import {useStyles} from './theme/gstyle.js';

import {initializedApp} from './redux/app-reducer.js';
import {quitUser, deleteAccount} from './redux/auth-reducer.js';
import {reqInitApp, reqNotify, reqSitecolor, reqQuitModal, reqDeleteModal, reqRole} from './redux/user-selectors.js';
import {setQuitModal, setDeleteModal} from './redux/modal-reducer.js';
import {convertColor} from './common/utils/functions.js';

import Preloader from './common/Preloaders/Preloader/Preloader.jsx';
import Notify from './common/Notify/Notify.jsx';
import {withSuspense} from './hoc/withSuspense.js';
import Main from './pages/Main/Main.jsx';
import ModalDefault from './common/Modal/ModalDefault/ModalDefault.jsx';
import ModalConfirm from './common/Modal/ModalConfirm/ModalConfirm.jsx';
import Box from '@mui/material/Box';

import {ThemeProvider} from '@mui/material/styles';
import {theme} from './theme/theme.js';

import UserBan from './pages/UserBan/UserBan.jsx';
const Login = React.lazy(() => import('./pages/Login/Login.jsx'));
const Register = React.lazy(() => import('./pages/Register/Register.jsx'));
const Recovery = React.lazy(() => import('./pages/Recovery/Recovery.jsx'));
const NotFound = React.lazy(() => import('./pages/404/404.jsx'));
const Profile = React.lazy(() => import('./pages/Profile/Profile.jsx'));
const NotifyPage = React.lazy(() => import('./pages/Notify/Notify.jsx'));
const Admin = React.lazy(() => import('./pages/Admin/Admin.jsx'));
const Info = React.lazy(() => import('./pages/Info/Info.jsx'));
const Tasks = React.lazy(() => import('./pages/Tasks/Tasks.jsx'));

const useLocalStyles = makeStyles({
    notify: {
        left: '50%',
        transform: 'translateX(-50%)',
        top: 5,
        position: 'absolute',
        zIndex: 50000,
        maxWidth: 350,
        cursor: 'pointer',
        '@media (max-width: 500px)': {
            maxWidth: 300
        }
    }
});

const App = ({initApp, initializedApp, notify, sitecolor, quitUser, quitModal, setQuitModal, deleteModal, setDeleteModal,
deleteAccount, role}) => {
    const gstyle = useStyles();
    const localStyle = useLocalStyles();

    const [localTheme, setLocalTheme] = React.useState('');
    const [notifyArr, setNotifyArr] = React.useState('');

    // Инициализируем приложение
    React.useEffect(() => {
        initializedApp();
    }, [initializedApp]);

    // Получаем массив уведомлений
    React.useEffect(() => {
        setNotifyArr(Object.keys(notify).map((key) => {
            return notify[key];
        }));
    }, [notify]);

    // Получаем и меняем цветовую гамму
    React.useEffect(() => {
        document.documentElement.style.setProperty('--mainC', sitecolor ? sitecolor : '#007cee');
        setLocalTheme(createTheme(theme, {
            palette: {
                primary: {
                    main: sitecolor ? sitecolor : '#007cee',
                    dark: convertColor(sitecolor),
                    light: convertColor(sitecolor)
                },
                lightblue: {
                    main: '#F2F5FF'
                }
            }
        }));
    }, [sitecolor]);

    const routes = [
        {path: '/', exact: true, Component: Main},
        {path: '/login', exact: true, Component: Login},
        {path: '/register', exact: true, Component: Register},
        {path: '/recovery', exact: true, Component: Recovery},
        {path: '/profile', exact: false, Component: Profile},
        {path: '/notify', exact: false, Component: NotifyPage},
        {path: '/admin', exact: false, Component: Admin},
        {path: '/info', exact: false, Component: Info},
        {path: '/tasks', exact: false, Component: Tasks},
        {path: '/404', exact: true, Component: NotFound}
    ]

    const quitAccount = () => {
        quitUser(true);
        setQuitModal(false);
    }

    const deleteUserAccount = () => {
        deleteAccount();
        setDeleteModal(false);
    }

    if(!initApp){
        return <Preloader />
    }

    return(
        <ThemeProvider theme={localTheme}>
            {/* Уведомления */}
            {notifyArr.length > 0
            && <Box className={`${gstyle.w100} ${gstyle.flexstart} ${localStyle.notify}`}>
                {notifyArr.map((n, id) => <Notify key={id} data={n} />)}
            </Box>}

            {role === 'ban'
            ? <UserBan />
            : <Box className={gstyle.w100} sx={{display: 'flex'}}>
                {/* Модальные окна */}
                {quitModal && <ModalDefault title="Вы действительно хотите выйти с аккаунта?" textEventButton="Выйти"
                 onClick={quitAccount} cansel={() => setQuitModal(false)} open={quitModal} />}
                {deleteModal && <ModalConfirm title="Вы действительно хотите удалить аккаунт?" textEventButton="Удалить"
                 onClick={deleteUserAccount} cansel={() => setDeleteModal(false)} open={deleteModal} confirmWord="ПОДТВЕРДИТЬ" />}

                <Switch>
                    {routes.map(({path, exact, Component}) => <Route key={path} exact={exact} path={path} render={() => withSuspense(Component)} />)}
                    <Route path="*" render={() => <Redirect to={"/404"} />} />
                </Switch>
            </Box>}
        </ThemeProvider>
    )
}

const mapStateToProps = (state) => {
    return{
        initApp: reqInitApp(state),
        notify: reqNotify(state),
        sitecolor: reqSitecolor(state),
        quitModal: reqQuitModal(state),
        deleteModal: reqDeleteModal(state),
        role: reqRole(state)
    }
}

export default connect(mapStateToProps, {initializedApp, quitUser, setQuitModal, setDeleteModal, deleteAccount})(App);