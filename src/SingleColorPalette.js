import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import ColorBox from "./ColorBox";
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from "./styles/PaletteStyles";


class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex" };
        this.changeFormat = this.changeFormat.bind(this);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        // console.log(this._shades);
    }

    gatherShades(palette, colorToFilterBy) {
        // return all shades of given color
        let shades = [];
        let allColors = palette.colors;
        // console.log(allColors);
        // 50, 100, 200, 300, ...
        for (let key in allColors) {
            // concatenates object arrays (1 object inside, a single shade for a specific color) to form a new array of objects
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            );
        }
        // console.log(shades);
        // remove white (used to generate shades in colorHelpers)
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val });
    }

    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(shade => (
            <ColorBox
                key={shade.hex}
                name={shade.name}
                background={shade[format]}
                showingFullPalette={false}
            />
        ))
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false} />
                <div className={classes.PaletteColors}>
                    { colorBoxes }
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);