import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './Todo.module.css'
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import { TodoInterface } from "../../../interface/interface"
import ModalDelete from "../../../components/Modal/ModalDelete";
import ModalAdd from "../../../components/Modal/ModalTodo";

interface Interface {
    observeStorage: () => void,
    todo: TodoInterface,
    index: number
}

const Todo = (props: Interface) => {
    const [openDeleteModal, toggleIsOpenDeleteModal] = React.useState(false);
    const { observeStorage, todo, index } = props;
    const [isOpen, toggleIsOpen] = useState(false);

    const deleteTodo = () => {
        toggleIsOpenDeleteModal(true)
    };

    return (
        <>
        <section className={styles.todoItem} key={index}>
            <header>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item xs={8}>
                       <h3 className={styles.todoTitle}>{todo.name}</h3>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container justify="flex-end" spacing={1}>
                            <Grid item>
                                <Fab size="small" color="secondary" aria-label="edit" onClick={() => toggleIsOpen(true)}>
                                    <EditIcon />
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab size="small" color="secondary" aria-label="delete" onClick={deleteTodo}>
                                    <DeleteIcon />
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </header>
            <main>
                <Grid container justify="space-between">
                    <Grid item xs={8} className={styles.todoDescription}>
                        {todo.description}
                    </Grid>
                    <Grid item xs={4}>
                        <div className={styles.todoDate}>{todo.date}</div>
                    </Grid>
                </Grid>
            </main>
        </section>
        <ModalDelete isOpen={openDeleteModal}
                     toggleIsOpenDeleteModal={toggleIsOpenDeleteModal}
                     name={todo.name}
                     id={todo.id}
                     observeStorage={observeStorage}/>
        {isOpen && <ModalAdd isOpen={isOpen}
                             toggleIsOpen={toggleIsOpen}
                             item={todo}
                             observeStorage={observeStorage} />}
        </>
    )
};

export default Todo;