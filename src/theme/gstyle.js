import {makeStyles} from '@mui/styles';
import {theme} from './theme.js';

export const useStyles = makeStyles({
    flexstart: {
    	display: 'flex',
    	flexDirection: 'column',
    	alignItems: 'flex-start'
    },
    w100: {
    	width: '100%'
    },
    flexcenter: {
    	display: 'flex',
    	flexDirection: 'column',
    	alignItems: 'center'
    },
    flexbet: {
    	display: 'flex',
    	justifyContent: 'space-between',
    	alignItems: 'center'
    },
    flexbetstart: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    flexwrap: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    flexDef: {
        display: 'flex',
        alignItems: 'center'
    },
    flexsh: {
    	flexShrink: 0
    },
    textCenter: {
        textAlign: 'center'
    },
    flex: {
    	display: 'flex',
    	alignItems: 'center',
    	justifyContent: 'center'
    },
    wrap: {
        flexWrap: 'wrap'
    },
    wrapper: {
        padding: '6rem',
        minHeight: '100vh',
        '@media (max-width: 1700px)': {
            padding: "4rem"
        },
        '@media (max-width: 1260px)': {
            padding: "2rem"
        },
        '@media (max-width: 500px)': {
            padding: '0 0 0 0'
        },
    },
    wrapperContent: {
        background: theme.palette.lightblue.main,
        borderRadius: 15,
        minHeight: '100%',
        padding: '3rem',
        '@media (max-width: 1350px)': {
            padding: "2rem"
        },
        '@media (max-width: 500px)': {
            padding: '6rem 1.5rem 1.5rem 1.5rem'
        },
    },
    wrapperProfile: {
        '@media (max-width: 500px)': {
            padding: '1.5rem'
        },
    },
    linkInner: {
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        paddingBottom: '1rem',
        '&::-webkit-scrollbar': {
            width: 0,
            height: '5px'
        },
        '@media (max-width: 998px)': {
            '&::-webkit-scrollbar': {
                height: 0
            }
        },
    },
    img: {
        width: '100%',
        height: 'auto'
    },
    imgRes: {
        width: 'auto',
        height: 'auto',
        maxWidth: '65%',
        maxHeight: '65%'
    },
    loaderInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        padding: '2rem 0'
    },
    loaderInnerFill: {
        height: '100%',
        padding: '4rem 0'
    },
    loaderInnerTop: {
        padding: '1.5rem 0',
        background: theme.palette.lightblue.main
    },
    loaderInnerTopOpacity: {
        padding: '1.5rem 0'
    },
    loader: {
        margin: '60px auto',
        fontSize: '10px',
        position: 'relative',
        textIndent: '-9999em',
        borderTop: '1.1em solid rgba(101,171,248, 0.2)',
        borderRight: '1.1em solid rgba(101,171,248, 0.2)',
        borderBottom: '1.1em solid rgba(101,171,248, 0.2)',
        borderLeft: '1.1em solid var(--mainC)',
        transform: 'translateZ(0)',
        animation: 'load 1.1s infinite linear',
        overflow: 'hidden',
        borderRadius: '50%',
        width: '8em',
        height: '8em',
        '&:after': {
            overflow: 'hidden',
            borderRadius: '50%',
            width: '8em',
            height: '8em'
        }
    },
    loaderSmall: {
        width: '1.5em',
        height: '1.5em',
        '&:after': {
            width: '1.5em',
            height: '1.5em'
        }
    },
    '@global': {
        '@keyframes load': {
            '0%': {
                transform: 'rotate(0deg)'
            },
            '100%': {
                transform: 'rotate(360deg)'
            }
        }
    },
    inputInner: {
        marginTop: 10,
        '&:first-child': {
            marginTop: 0
        }
    },
    inputWrapper: {
        position: 'relative'
    },
    input: {
        background: '#fff',
        borderRadius: 7,
        border: `1px solid ${theme.palette.border.main}`,
        color: '#000',
        padding: '1rem 4.5rem 1rem 1.5rem',
        outline: 'none'
    },
    inputDelete: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 20,
        display: 'flex',
        alignItems: 'center'
    },
    inputTextarea: {
        top: 15,
        transform: 'translateY(0)'
    },
    modal: {
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        zIndex: 20,
        top: 0,
        left: 0
    },
    modalInner: {
        background: '#fff',
        padding: 20,
        borderRadius: 7,
        maxWidth: 535,
        '@media (max-width: 590px)': {
            maxWidth: 450
        },
        '@media (max-width: 500px)': {
            maxWidth: 300,
            padding: 15
        }
    },
    sidebarContent: {
        borderBottom: '15px solid #fff',
        padding: '2rem 0',
        '@media (max-width: 500px)': {
            padding: '1rem 0'
        }
    },
    sidebarLink: {
        padding: '1rem 2rem',
        display: 'inline-block',
        position: 'relative',
        '&:hover': {
            background: 'var(--mainC)',
            color: '#fff'
        },
        '&.active': {
            background: 'var(--mainC)',
            color: '#fff'
        },
        '@media (max-width: 500px)': {
            fontSize: '1.6rem',
            padding: '.7rem 2rem'
        }
    },
    auth: {
        height: '100vh',
        padding: '6rem 0',
        overflowY: 'auto',
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 730px)': {
            padding: '3rem 2rem'
        },
        '@media (max-width: 500px)': {
            padding: '2rem 1rem'
        }
    },
    authWrapper: {
        minHeight: 'calc(100vh - 12rem)'
    },
    authInner: {
        maxWidth: 602,
        borderRadius: 15,
        background: theme.palette.lightgrey.main,
        border: '2px solid var(--mainC)',
        padding: '4rem 6rem',
        '@media (max-width: 590px)': {
            padding: '3rem'
        },
        '@media (max-width: 500px)': {
            padding: '2rem 1rem'
        }
    },
    authLink: {
        fontSize: '1.8rem',
        '@media (max-width: 500px)': {
            fontSize: '1.6rem'
        }
    },
    tabContext: {
        width: '100%',
        minHeight: 'auto'
    },
    tabContainer: {
        overflowX: 'auto',
        paddingBottom: '1rem',
        '&::-webkit-scrollbar': {
            width: 0,
            height: '5px'
        },
        '@media (max-width: 998px)': {
            '&::-webkit-scrollbar': {
                height: 0
            }
        }
    },
    tableItem: {
        padding: '.8rem',
        border: '1px solid var(--mainC)',
        borderTop: 'none',
        '&:nth-child(odd)': {
            borderRight: 'none'
        },
        '&:nth-child(1), &:nth-child(2)': {
            borderTop: '1px solid var(--mainC)'
        }
    },
    settingsBox: {
        width: '48%',
        '@media (max-width: 1520px)': {
            width: '100%'
        },
    }
});