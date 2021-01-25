import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles/NavbarStyles";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: 'hex', open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false })
    }

    render() {
        const { level, changeLevel, showingAllColors, classes } = this.props;
        const { format, open } = this.state;
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}><Link to="/">Color Picker</Link></div>
                {showingAllColors && 
                    <div className={classes.sliderContainer}>
                        <span>Level: {level}</span>
                        <div className={classes.slider}>
                            <Slider
                                defaultValue={level}
                                min={100}
                                max={900}
                                onAfterChange={changeLevel}
                                step={100}
                                trackStyle={{ backgroundColor: 'transparent' }}
                                handleStyle={{
                                    borderColor: 'green',
                                    height: 13,
                                    width: 13,
                                    marginLeft: 0,
                                    marginTop: -3,
                                    backgroundColor: 'green',
                                    boxShadow: 'none',
                                }}
                                railStyle={{ height: 8 }}
                            />
                        </div>
                    </div>
                }

                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleFormatChange} >
                        <MenuItem value="hex">HEX - #ffffff</ MenuItem >
                        <MenuItem value="rgb">RGB - rgb(10, 10, 10)</ MenuItem >
                        <MenuItem value="rgba">RGBA - rgba(10, 10, 10. 1.0)</ MenuItem >
                    </Select>
                </div>
                <Snackbar 
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }} open={open} 
                    autoHideDuration={ 3000 } 
                    message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>} 
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    // make it close when user clicks outside the Snackbar
                    onClose={this.closeSnackbar}
                    action={[<IconButton onClick={this.closeSnackbar} color="inherit" key="close" aria-label="close"><CloseIcon /></IconButton>]}
                />
            </header>

        )
    }
}

export default withStyles(styles)(Navbar);