import { DRAWER_WIDTH, DRAWER_WIDTH_SML} from '../constants';
import sizes from './sizes';

const drawerWidth = DRAWER_WIDTH;
const drawerWidthSml = DRAWER_WIDTH_SML;

const styles = theme => ({
    root: {
        display: "flex",
    },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        [sizes.down('xxs')]: {
            width: `calc(100% - ${drawerWidthSml}px)`,
            marginLeft: drawerWidthSml,
        }
    },
    header: {
        [sizes.down('xxs')]: {
            fontSize: "16px",
        }        
    },

    menuButton: {
        marginLeft: 12,
        marginRight: 20,
        [sizes.down('xxs')]: {
            padding: 0,
        }       
    },
    navBtns: {
        marginRight: "1rem",
        "& a": {
            textDecoration: "none"
        },
        [sizes.down('xs')]: {
            margin: 0,      
        }
    },
    button: {
        margin: "0 0.4rem",
        [sizes.down('xs')]: {
            margin: "0.1rem",
            padding: "3px 7px"
        }
    },
    hide: {
        display: "none"
    }
});

export default styles;