import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { ChromePicker } from "react-color";
import chroma from 'chroma-js';

import styles from "./styles/ColorPickerFormStyles";


class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = { currentColor: "teal", newColorName: "",}
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }


    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        
        this.props.addNewColor(newColor);
        this.setState({newColorName: ''})
    }
    

    render() {
        const { paletteIsFull, classes } = this.props;
        const {currentColor, newColorName} = this.state;
        return (
            <div>
                <ChromePicker
                    className={classes.picker}
                    width="100%"
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    disableAlpha={true}
                />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator
                        className={classes.colorNameInput}
                        value={newColorName}
                        name="newColorName"
                        placeholder='Color Name'
                        variant='filled'
                        margin='normal'
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique', 'Color already used']}
                    />
                    <Button
                        className={classes.addColor}
                        variant='contained'
                        type='submit'
                        color='primary'
                        disabled={paletteIsFull}
                        style={{ 
                            backgroundColor: paletteIsFull 
                                ? 'grey' : currentColor,
                            color: chroma(currentColor).luminance() >= 0.5 ? "rgba(0,0,0,0.8)" : "white",
                        }}
                    >
                        {!paletteIsFull ? 'Add Color' : 'Palette full'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);