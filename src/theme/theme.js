import {createTheme} from '@mui/material/styles';

const font = 'Nunito,-apple-system,BlinkMacSystemFont,sans-serif';
export let theme = createTheme({
	palette: {
	    primary: {
	    	main: '#007cee'
	    },
	    secondary: {
	        main: '#7d2ae8'
	    },
	    text: {
	    	main: '#000'
	    },
	    white: {
	    	main: '#fff'
	    },
	    lightblue: {
	    	main: '#F2F5FF'
	    },
	    lightgrey: {
	    	main: '#F6F7FB'
	    },
	    greytext: {
	    	main: '#969696'
	    },
	    border: {
	    	main: '#cdcdcd'
	    },
	    action: {
		    disabledBackground: 'rgba(150, 150, 150, .3)',
		    disabled: 'rgba(0, 0, 0, .5)'
		},
		copy: {
			main: '#aaa'
		},
		warn: {
			main: '#FFD764'
		},
		info: {
			main: '#00C1FD'
		}
	},
	spacing: 10,
	shape: {
		borderRadius: 10
	},
	components: {
	    MuiButton: {
	        styleOverrides: {
	        	root: {
	            	fontSize: '1.8rem',
	            	textTransform: 'none',
	            	fontFamily: font,
	            	padding: '.7rem 2.5rem',
	            	borderRadius: 7,
	            	lineHeight: 1.5,
	            	boxShadow: 'none',
	            	'&:hover': {
	            		boxShadow: 'none'
	            	},
	            	'&.active': {
	            		background: 'var(--mainC)',
	            		color: '#fff'
	            	},
	            	'&:active': {
	            		boxShadow: 'none'
	            	},
	            	'@media (max-width: 500px)': {
	            		fontSize: '1.6rem',
	            		padding: '.7rem 2rem'
	            	}
	            },
	      	},
	    },
	    MuiLink: {
	    	styleOverrides: {
	    		root: {
	    			textDecoration: 'none',
	    			color: 'var(--mainC)'
	    		}
	    	}
	    },
	    MuiTabPanel: {
	    	styleOverrides: {
	    		root: {
	    			padding: 0,
	    			width: '100%'
	    		}
	    	}
	    },
	    MuiLinearProgress: {
	        styleOverrides: {
	        	root: {
	            	background: '#fff',
	            	color: 'var(--mainC)',
	            	borderRadius: 50
	            },
	      	},
	    },
	    MuiTab: {
	    	styleOverrides: {
	    		root: {
	    			fontSize: '1.8rem',
	    			borderRadius: 50,
	    			display: 'flex',
	    			alignItems: 'center',
	    			justifyContent: 'center',
	    			minWidth: 'auto',
	    			minHeight: 'auto',
	    			border: '1px solid var(--mainC)',
	    			background: '#fff',
	    			padding: '.8rem 1.5rem',
	    			textTransform: 'none',
	    			color: 'var(--mainC)',
	    			"&.Mui-selected": {
	    			    background: 'var(--mainC)',
	    			    color: '#fff'
	    			}
	    		}
	    	}
	    }
	},
	typography: {
		fontFamily: font,
		h1: {
			fontSize: '5rem',
			fontWeight: 700,
			'@media (max-width: 1750px)': {
				fontSize: "4rem"
			},
			'@media (max-width: 1120px)': {
				fontSize: "3.5rem"
			},
			'@media (max-width: 600px)': {
				fontSize: "3.2rem"
			}
		},
		h2: {
			fontSize: '4rem',
			fontWeight: 700,
			'@media (max-width: 1360px)': {
				fontSize: "3.5rem"
			},
			'@media (max-width: 768px)': {
				fontSize: "3rem"
			},
			'@media (max-width: 480px)': {
				fontSize: "2.5rem"
			}
		},
		h3: {
			fontSize: '3rem',
			fontWeight: 700,
			'@media (max-width: 1200px)': {
				fontSize: "2.4rem"
			},
			'@media (max-width: 500px)': {
				fontSize: "2rem"
			}
		},
		h4: {
			fontSize: '2.4rem',
			fontWeight: 400,
			'@media (max-width: 1750px)': {
				fontSize: "2.2rem"
			},
			'@media (max-width: 1120px)': {
				fontSize: "2rem"
			},
			'@media (max-width: 600px)': {
				fontSize: "1.8rem"
			}
		},
		h5: {
			fontSize: '2.1rem',
			fontWeight: 400,
			'@media (max-width: 1360px)': {
				fontSize: "1.9rem"
			},
			'@media (max-width: 768px)': {
				fontSize: "1.6rem"
			}
		},
		h6: {
			fontSize: '2rem',
			fontWeight: 400,
			lineHeight: 1.2,
			'@media (max-width: 1360px)': {
				fontSize: "1.8rem"
			},
			'@media (max-width: 768px)': {
				fontSize: "1.6rem"
			}
		},
		p: {
			fontSize: '1.8rem',
			fontWeight: 400,
			'@media (max-width: 500px)': {
				fontSize: "1.6rem"
			}
		},
		p2: {
			fontSize: '1.6rem',
			fontWeight: 400,
			'@media (max-width: 500px)': {
				fontSize: "1.4rem"
			}
		},
		p3: {
			fontSize: '1.5rem',
			fontWeight: 400,
			'@media (max-width: 500px)': {
				fontSize: "1.4rem"
			}
		}
	},
	breakpoints: {
		values: {
			r0: 0,
			r360: 360,
			r480: 480,
			r500: 500,
			r600: 600,
			r620: 620,
			r680: 680,
			r700: 700,
			r768: 768,
			r860: 860,
			r998: 998,
			r1200: 1200,
			r1260: 1260,
			r1360: 1360,
			r1500: 1500,
			r1520: 1520,
			r1700: 1700,
			r1750: 1750
		}
	}
});