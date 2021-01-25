import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from './PaletteFormNav';
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import ColorPickerForm from "./ColorPickerForm";
import { seedColors } from './seedColors';
import styles from './styles/NewPaletteFormStyles';


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: seedColors[0].colors,
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteColorBox = this.deleteColorBox.bind(this);
        this.clearColors = this.clearColors.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    state = {
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor(newColor) {
        // also set newPaletteName to '' to clear form after user submitted
        this.setState({colors: [...this.state.colors, newColor], newColorName: ''});
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit(newPalette) {
        // id will be shown in url so remove spaces
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, "-");
        newPalette.colors = this.state.colors;
        this.props.savePalette(newPalette);  
        // redirect to home page once new palette is created
        this.props.history.push("/");
    }

    deleteColorBox(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        });
    }

    // dnt have to bind because it is using class property syntax
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
            colors: arrayMove(colors, oldIndex, newIndex),
        }));
    };

    clearColors() {
        this.setState({colors: []});
    }

    randomArrayEle(arr) {
        return arr[Math.floor(Math.random() * arr.length)]; 
    }

    addRandomColor() {
        const {palettes} = this.props;
        const {colors} = this.state;
        // pick random color from existing palettes. Also consider case where all palettes deleted 
        let randomPalette;
        // need to determine if the available palettes have at least 20 unique names, else if palette is cleared and 
        // random colors are chosen, this function will loop infinitely.
        const allColors = (palettes.map(p => p.colors).flat()).map(obj => obj.name);
        const allColorsSet = new Set(allColors);

        if (palettes.length === 0 || allColorsSet.size < 20) {
            randomPalette = this.randomArrayEle(seedColors);
        } else {
            randomPalette = this.randomArrayEle(palettes);
        }
        // inside a given palette, open color array (store as var) and randomly choose one
        const randomColor = this.randomArrayEle(randomPalette.colors);
        // make sure random color not used already, if it exists then call addRandomColor again
        if (colors.every(color => color !== randomColor )) {
            this.setState({ colors: [...colors, randomColor], newColorName: '' })
        } else {
            // random color already used
            this.addRandomColor();
        }
    }

    render() {
        const { classes, maxColors, palettes } = this.props;
        const { open, colors} = this.state;
        const paletteIsFull = colors.length >= maxColors;

        return (
            <div className={classes.root}>
                <PaletteFormNav 
                    open={open}
                    palettes={palettes} 
                    handleSubmit={this.handleSubmit} 
                    handleDrawerOpen={this.handleDrawerOpen}
                />
                <Drawer
                    className={classes.drawer}
                    variant='persistent'
                    anchor='left'
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                        <div className={classes.buttons}>
                            <Button 
                                className={classes.button} 
                                variant='contained' 
                                color='secondary' 
                                onClick={this.clearColors}
                            >
                                Clear Palette
                            </Button>
                            <Button 
                                className={classes.button} 
                                variant='contained' 
                                color='primary' 
                                onClick={this.addRandomColor} 
                                disabled={paletteIsFull}
                            >
                                Random Color
                            </Button>
                        </div>

                        <ColorPickerForm paletteIsFull={paletteIsFull} addNewColor={this.addNewColor} colors={colors}/>
                    </div>
                </Drawer>
                <main
                    // give it the classname of content, and conditionally give it the cassname of contentShift if open is true
                    className={classNames(classes.content, {
                        [classes.contentShift]: open
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList 
                        colors={colors} 
                        deleteColorBox={this.deleteColorBox}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                        // mouse must move 10px after clicking to trigger drag. Prevents click on delete icon being interpreted as a drag
                        distance={10}
                    />

                </main>
            </div>
        );
    }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);