import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import {makeStyles} from '@mui/styles';

import {useStyles} from '../../../theme/gstyle.js';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import PageWrapper from '../../../common/PageWrappers/PageWrapper/PageWrapper.jsx';
import NavLinkMui from '../../../common/Buttons/NavLinkMui/NavLinkMui.jsx';
import MainImg from '../../../assets/img/MainImg.jsx';

import Point from './Point/Point.jsx';

import {reqIsAuth} from '../../../redux/user-selectors.js';

const useLocalStyles = makeStyles({
    main: {
        background: 'linear-gradient(90deg, var(--mainC) 0%, rgba(255, 255, 255, .1) 150%)',
        padding: '7.2rem 6rem',
        '@media (max-width: 1360px)': {
            flexDirection: 'column',
            padding: '5rem 3rem'
        },
        '@media (max-width: 600px)': {
            padding: '5rem 2rem'
        }
    },
    mainInner: {
        maxWidth: '685px',
        alignItems: 'flex-start',
        '@media (max-width: 1750px)': {
            maxWidth: '420px'
        },
        '@media (max-width: 1360px)': {
            maxWidth: '100%',
            alignItems: 'center'
        }
    },
    buttonInner: {
        marginTop: '4rem',
        display: 'flex',
        width: 'auto',
        '@media (max-width: 1750px)': {
            flexDirection: 'column'
        },
        '@media (max-width: 1360px)': {
            flexDirection: 'row'
        },
        '@media (max-width: 1200px)': {
            marginTop: '2rem'
        },
        '@media (max-width: 600px)': {
            flexDirection: 'column'
        },
        '@media (max-width: 360px)': {
            width: '100%'
        }
    },
    imgInner: {
        width: '591px',
        '@media (max-width: 1500px)': {
            width: '470px'
        },
        '@media (max-width: 1360px)': {
            marginTop: '3rem',
            width: '60%'
        },
        '@media (max-width: 768px)': {
            width: '75%'
        },
        '@media (max-width: 500px)': {
            width: '100%'
        }
    }
});

const Main = ({isAuth}) => {
    const gstyle = useStyles();
    const localStyle = useLocalStyles();
    
    React.useEffect(() => {
        $('.project__more').on('click', function(e){
            e.preventDefault();
            $('.content').animate({scrollTop: $("#project__more").offset().top + $(".content").scrollTop()}, 300);
        });
    }, []);

    React.useEffect(() => {
        document.title = 'ResEz';
    }, []);

    return(
        <PageWrapper>
            <Box className={`${gstyle.flexbet} ${gstyle.flexsh} ${gstyle.w100} ${localStyle.main}`}>
                <Box className={`${gstyle.flexstart} ${gstyle.w100} ${localStyle.mainInner}`}>
                    <Typography component="h1" variant="h1" color="white.main" sx={{textAlign: {r1360: 'left', r0: 'center'}}}>
                        Подготовиться к ЕГЭ? Легко!
                    </Typography>

                    <Typography component="p" variant="h4" color="white.main" sx={{mt: 1, textAlign: {r1360: 'left', r0: 'center'}}}>
                        Практика - это самое важное! Усвоить материал поможет только она!
                    </Typography>

                    <Box className={localStyle.buttonInner}>
                        <NavLinkMui href={isAuth ? "tests" : "login"} sx={{bgcolor: 'white.main', color: 'var(--mainC)', m: {r1750: '0 3rem 0 0', 
                        r1360: '0 0 1rem 0', r600: '0 2rem 0 0', r0: '0 0 1rem 0'}, minWidth: {r1750: 'auto', 
                        r1360: '300px', r600: 'auto', r360: '300px'}, width: {r360: 'auto', r0: '100%'}, '&:hover': {bgcolor: '#d0d0d0'}}}>
                            Перейти к практике
                        </NavLinkMui>
                        
                        <Button variant="contained" sx={{bgcolor: 'white.main', color: 'var(--mainC)', minWidth: {r1750: 'auto', 
                        r1360: '300px', r600: 'auto', r360: '300px'}, width: {r360: 'auto', r0: '100%'}, '&:hover': {bgcolor: '#d0d0d0'}}}
                        className="project__more">
                            Подробнее о проекте
                        </Button>
                    </Box>
                </Box>

                <Box className={`${gstyle.flexsh} ${localStyle.imgInner}`}>
                    <MainImg />
                </Box>
            </Box>

            <Box id="project__more"></Box>
            <Point />
        </PageWrapper>
    )
}

const mapStateToProps = (state) => {
    return{
        isAuth: reqIsAuth(state)
    }
}

export default connect(mapStateToProps, {})(Main);