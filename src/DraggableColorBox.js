import React from 'react';
import { SortableElement } from "react-sortable-hoc";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement(props => {
    const {classes, handleDelete, name, color} = props;
    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.DeleteIcon} onClick={handleDelete}/>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox);