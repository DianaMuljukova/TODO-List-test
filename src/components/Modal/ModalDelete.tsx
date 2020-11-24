import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TodoInterface } from '../../interface/interface';


export default function DeleteModal({isOpen, toggleIsOpenDeleteModal, name, id, observeStorage}:
    {isOpen: boolean, toggleIsOpenDeleteModal: (status:false) => void, name: string, id: number, observeStorage: () => void}) {

    const deleteTodo = () => {
        const storageTodoList = localStorage.getItem('todoList');
        const todoList: TodoInterface[] = storageTodoList ? JSON.parse(storageTodoList) : [];
        const items = todoList.filter(todo => String(todo.id) !== String(id));
        localStorage.setItem('todoList', JSON.stringify(items));
        observeStorage();
        toggleIsOpenDeleteModal(false);
    };


    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={() => toggleIsOpenDeleteModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Вы уверены, что хотите удалить задачу ${name}?`}</DialogTitle>
                <DialogActions>
                    <Button onClick={() => toggleIsOpenDeleteModal(false)} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={deleteTodo} color="primary" autoFocus>
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}