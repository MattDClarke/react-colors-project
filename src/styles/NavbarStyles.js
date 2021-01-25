import sizes from './sizes';

export default {
    Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "'Roboto', sans-serif",
        height: "100%",
        display: "flex",
        alignItems: "center",
        whiteSpace: "nowrap",
        "& a": {
            textDecoration: "none",
            color: "black"
        },
        [sizes.down("sm")]: {
            fontSize: "18px"
        },
        [sizes.down("xs")]: {
            display: "none"
        }
    },

    sliderContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "60%",
        paddingRight: "1rem",
        "& span": {
            paddingRight: "20px",
            whiteSpace: "nowrap",
            
            [sizes.down("xxs")]: {
                display: "none"
            },
        },
        [sizes.down("sm")]: {
            width: "100%",
            fontSize: "16px",
            paddingLeft: "1rem"
        }
    },

    selectContainer: {
        marginLeft: "auto",
        marginRight: "1rem",

        [sizes.down("sm")]: {
            fontSize: "14px",
        },
    },

    slider: {
        width: "100%"
    }
}