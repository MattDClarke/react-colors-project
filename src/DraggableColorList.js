import React from 'react';
import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, deleteColorBox}) => {
    return (
        <div style={{ height: "100%" }}>
            {colors.map((color, i) => (
                <DraggableColorBox
                    key={color.name}
                    index={i}
                    color={color.color}
                    name={color.name}
                    handleDelete={() => deleteColorBox(color.name)}
                />
            ))}
        </div>
    )
})

export default DraggableColorList;