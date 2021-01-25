import chroma from 'chroma-js';
import sizes from './sizes';

export default {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        marginTop: "-0.5px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s",
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => props.showingFullPalette ? "20%" : "33.3333333%",
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => props.showingFullPalette ? "10%" : "20%",
        },
        // property computed inside object literal -> computed property (of ColorBox) name
        [sizes.down("xs")]: {
            width: "100%",
            height: props => props.showingFullPalette ? "5%" : "10%",
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.8)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.8)" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: "0",
        cursor: "pointer"
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        padding: "10px",
        left: "0",
        bottom: "0",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)",

    },
    showOverlay: {
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMsg: {
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        zIndex: "-1",
        "& h1": {
            fontWeight: "400px",
            textShadow: "4px 4px 4px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100 %",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
            [sizes.down("xs")] : {
                fontSize: "4rem",
                textShadow: "2px 2px 2px black",
            },
        },
        "& p": {
            fontSize: "2rem",
            fontWeight: "100"
        }
    },
    showCopyMsg: {
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in -out",
        transitionDelay: "0.3s"

    }
}
