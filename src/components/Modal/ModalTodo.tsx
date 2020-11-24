import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { TodoInterface } from '../../interface/interface';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
            width: '100%',
        }
    }),
);

interface Todo {
    name: string,
    description: null | string
}
export default function ModalAdd(props: {isOpen: boolean, toggleIsOpen: (status: boolean) => void, item?: TodoInterface, observeStorage: () => void}) {
    const { isOpen, toggleIsOpen, item, observeStorage } = props;
    const [todo, setTodo] = useState<Todo>({name: '', description: ''});
    const isEditMode = !!(item);

    useEffect(() => {
        if (item) setTodo({name: item.name, description: item.description})
    }, [item]);

    const classes = useStyles();

    const handleClose = () => {
        toggleIsOpen(false)
    };

    const handleSubmit = () => {
        let todoList = localStorage.getItem('todoList');
        let newTodos: TodoInterface[] = [];
        if (todoList) {
            newTodos = JSON.parse(todoList) ? JSON.parse(todoList) : []
        }
        if (item) {
            let number = item.id;
            let index = newTodos.findIndex(todo => todo.id === number);
            newTodos.splice(index, 1, {...item, ...todo});
        } else {
            const StorageLastIndex = localStorage.getItem('lastIndex');
            const lastIndex = StorageLastIndex ? +StorageLastIndex + 1 : 1;
            const date = setDate();
            newTodos = [...newTodos, {...todo, id: lastIndex, date}];
            localStorage.setItem('lastIndex', JSON.stringify(lastIndex));
        }
        localStorage.setItem('todoList', JSON.stringify(newTodos));
        observeStorage();
        toggleIsOpen(false)
    };

    const setDate = () => {
        const d = new Date();
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${da}-${mo}-${ye}`;
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && todo.name.length >= 3) {
            handleSubmit()
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true} onKeyPress={handleKeyPress}>
            <DialogContent >
                <FormControl className={classes.root}>
                    <TextField id="task-input"
                               label="Добавить задание"
                               inputProps={{ maxLength: 64, autoComplete: 'off' }}
                               value={todo.name}
                               onChange={(e) => setTodo({...todo, ...{name: e.target.value}})} />
                    <TextField id="description-input"
                               label="Добавить описание"
                               inputProps={{ maxLength: 300, autoComplete: 'off' }}
                               value={todo.description}
                               onChange={(e) => setTodo({...todo, ...{description: e.target.value}})} />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" type="submit" onClick={handleSubmit} disabled={todo.name.length < 3}>
                    {isEditMode ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}