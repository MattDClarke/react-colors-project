import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';


export default function PaletteMetaForm(props) {

    const { handleSubmit, palettes, formShow } = props;
    const [newPaletteName, setNewPaletteName] = React.useState('');
    const [stage, setStage] = React.useState('form');

    React.useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
            palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );  
    })

    const handleClose = () => {
        formShow(false);
    };

    const savePalette = (emoji) => {
        handleSubmit({ paletteName: newPaletteName, emoji: emoji.native });
        // prevent emoji palette from lingering on page transition animation
        setStage('');
    }
    

    return (
        <div>
            <Dialog open={stage === 'emoji'} onClose={handleClose} >
                <DialogTitle id="form-dialog-title" style={{ textAlign: "center" }}>Pick a palette emoji</DialogTitle>
                <Picker onSelect={savePalette} title='Pick a palette emoji' autoFocus/>
            </Dialog>
            <Dialog open={stage === 'form'} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ textAlign: "center"}}>
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => setStage('emoji')}>
                    <DialogContent >
                        <DialogContentText>
                            Please enter a name for your new palette.
                        </DialogContentText>
                            <TextValidator
                                autoFocus
                                label="Palette Name"
                                value={newPaletteName}
                                name="newPaletteName"
                                onChange={e => setNewPaletteName(e.target.value)}
                                fullWidth
                                margin="normal"
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter palette name', 'Name already used']}
                            />
                    </DialogContent>
                    <DialogActions style={{justifyContent: "center" }}>
                        <Button variant='contained' color='primary' type='submit'>
                            Save Palette
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}
