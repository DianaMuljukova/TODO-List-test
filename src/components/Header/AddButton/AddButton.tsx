import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import ModalAdd from "../../Modal/ModalTodo";

const AddButton = (props: {isOpen: boolean, toggleIsOpen: (status: boolean) => void, observeStorage: () => void}) => {
    const { isOpen, toggleIsOpen, observeStorage } = props;

    return  (
        <>
            <Fab size="small" color="secondary" aria-label="add" onClick={() => {props.toggleIsOpen(true)}}>
                <AddIcon />
            </Fab>
            {isOpen && <ModalAdd isOpen={isOpen}
                                       toggleIsOpen={toggleIsOpen}
                                       observeStorage={observeStorage}/>}
        </>
    )
};

export default AddButton;