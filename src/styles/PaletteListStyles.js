import sizes from './sizes';
import bg from "./bg.svg"

export default {
    // class is prefixed by material UI css (scoped css) in js ...JSS, look for non-prefixed version from any file (not prefixed)
    // looking for non-scoped class
    "@global": {
        ".fade-exit": {
            opacity: 1
        },
        ".fade-exit-active": {
            opacity: 0,
            transition: "opacity 500ms ease-out"
        },
    },
    
    root: {
        minHeight: "100vh",
        padding: "1rem",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#FFEC5E",
        backgroundImage: `url(${bg})`,
        // background by SVGBackgrounds.com
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        lineHeight: "normal",
        fontSize: "1rem",
        paddingBottom: "2rem"
    },
    heading: {
        fontSize: "2rem",
        [sizes.down('xs')]: {
            fontSize: "1.5rem",
        },
    },
    container: {
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        color: "white",

        "& a": {
            color: "white",
            alignSelf: "center",
            marginBottom: "-5px"
        }
    },
    palettes: {
        boxSizing: "border-box",
        maxWidth: "1200px",
        width: "90vw",
        height: "100%",
        display: "grid",
        justifyContent: "center",
        gridTemplateColumns: "repeat(auto-fit, 250px)",
        gridAutoFlow: "row",
        gridGap: "1rem"
    },
    restoreDefaultBtn: {
        width: "250px",
        height: "59px",
        backgroundColor: "white",
        borderRadius: "5px",
        padding: "0.5rem",
        fontSize: "1.2rem",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "3px 3px 3px rgba(1,1,1,0.3)"
    }
}
