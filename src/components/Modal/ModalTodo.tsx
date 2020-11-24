import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

interface Todo {
    name: null | string,
    description: null | string
}
export default function ModalAdd(props: {isOpen: boolean, toggleIsOpen: (status: boolean) => void}) {
    const [todo, setTodo] = useState<Todo>({name: null, description: null});

    const classes = useStyles();
    const handleClose = () => {
        props.toggleIsOpen(false)
    };

    const handleSubmit = () => {
        let todoList = localStorage.getItem('todoList');
        let newTodos = [];
        if (todoList) {
            const last = todoList.length;
            newTodos = JSON.parse(todoList) ? [...JSON.parse(todoList), {...todo}] : []
        } else newTodos = [{...todo, number: '1'}];
         localStorage.setItem('todoList', JSON.stringify(newTodos));
         props.toggleIsOpen(false)
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.isOpen}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.isOpen}>
                <div className={classes.paper}>
                    <FormControl>

                        <TextField id="task-input"
                                   label="Добавить задание"
                                   inputProps={{ maxLength: 64 }}
                                   onChange={(e) => setTodo({...todo, ...{name: e.target.value}})} />
                        <TextField id="description-input"
                                   label="Добавить описание"
                                   inputProps={{ maxLength: 300 }}
                                   onChange={(e) => setTodo({...todo, ...{description: e.target.value}})} />


                        <Button variant="outlined" color="primary" type="submit" onClick={handleSubmit}>
                            Добавить
                        </Button>
                    </FormControl>
                </div>
            </Fade>
        </Modal>
    );
}