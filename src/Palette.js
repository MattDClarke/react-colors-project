import React, { Component } from "react";
import ColorBox from "./ColorBox";
import 'rc-slider/assets/index.css';
import Navbar from './Navbar';
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";
import { withStyles } from '@material-ui/core/styles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: "hex" };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeFormat(val) {
        this.setState({ format: val });
    }

    render() {
        const { level, format } = this.state;
        const { classes } = this.props;
        const { colors, id, paletteName, emoji } = this.props.palette;
        // map over current shade for each color in the current palette
        const colorBoxes = colors[level].map(color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id} 
                id={color.id} 
                paletteId={id}
                showingFullPalette
                handleChange={this.changeFormat}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
                <div className={classes.PaletteColors}>   
                    {/* bunch of color boxes */}
                    { colorBoxes }
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);