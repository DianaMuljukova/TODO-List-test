import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import Fab from '@material-ui/core/Fab';

const AddButton = () => (
    <Fab size="small" color="secondary" aria-label="add"
         //className={classes.fab}
    >
        <AddIcon />
    </Fab>
);

export default AddButton;