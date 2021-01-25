import { DRAWER_WIDTH, DRAWER_WIDTH_SML } from '../constants';
import sizes from './sizes';

const drawerWidth = DRAWER_WIDTH;
const drawerWidthSml = DRAWER_WIDTH_SML;

const styles = theme => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        [sizes.down('xxs')]: {
            width: drawerWidthSml,
        }
    },
    drawerPaper: {
        width: drawerWidth,
        display: "flex",
        alignItems: "center",
        [sizes.down('xxs')]: {
            width: drawerWidthSml,
        }
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: 0,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth,
        [sizes.down('xxs')]: {
            marginLeft: -drawerWidthSml,
        }
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    container: {
        width: "80%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        textAlign: "center",
    },
    buttons: {
        width: "100%"
    },
    button: {
        width: "48%",
        margin: "1%"
    }
});

export default styles;