import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import PaletteMetaForm from './PaletteMetaForm';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PaletteIcon from '@material-ui/icons/Palette';
import Button from "@material-ui/core/Button";
import styles from './styles/PaletteFormNavStyles';

function PaletteFormNav(props) {
    const { classes, open, handleSubmit, handleDrawerOpen, palettes } = props;
    const [formShowing, formShow] = React.useState(false);

    return (  
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position='fixed'
                color='default'
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}
            >
                <Toolbar disableGutters={!open}>
                    <IconButton
                        color='inherit'
                        aria-label='Open drawer'
                        onClick={handleDrawerOpen}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <PaletteIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit' noWrap className={classes.header}>
                        Create a Palette 
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to="/">
                        <Button className={classes.button} variant='contained' color='secondary'>
                            Go Back
                        </Button>
                    </Link>

                    <Button 
                        className={classes.button} 
                        variant="contained" 
                        color="primary" 
                        onClick={() => formShow(true)}
                    >
                        Save
                    </Button>
                </div>
            </AppBar>
            {formShowing && (<PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes} formShow={formShow} /> )}
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
