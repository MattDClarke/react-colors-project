import React from 'react';
import styles from './styles/MiniPaletteStyles';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, id, openDialog, goToPalette } = props;
    const miniColorBoxes = colors.map(color => (
        <div 
            className={classes.miniColor} 
            style={{ backgroundColor: color.color}}
            key={color.name}
        >
        </div >
    ))
    // console.log("Rendering:", paletteName);

    const deletePalette = (e) => {
        // prevent opening specific palette (changing route)
        e.stopPropagation();
        openDialog(id);
    }

    const handleClick = () => {
        goToPalette(id);
    }

    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            goToPalette(id);
        }
    }

    const handleKeyDownDelete = (e) => {
        if (e.code === 'Enter') {
            deletePalette(e);
        }
    }

    return ( 
        <div className={classes.root} onClick={handleClick} tabIndex="0" onKeyDown={handleKeyDown}>
            <DeleteIcon className={classes.deleteIcon} style={{ transition: "all 0.3s ease-in-out" }} onClick={deletePalette} tabIndex="0" onKeyDown={handleKeyDownDelete}/>
            <div className={classes.colors}>
                { miniColorBoxes }
            </div>
            <h5 className={classes.title}>{paletteName}<span className={classes.emoji}>{emoji}</span></h5>
        </div> 
    );
}

export default withStyles(styles)(React.memo(MiniPalette));