import React, { useEffect, useState } from 'react';
import Todo from "../Todo/Todo";
import { TodoInterface } from "../../../interface/interface";
import Header from "../../../components/Header/Header";


const TodoList = () => {
    const [todoList, setTodoList] = useState<TodoInterface[]>([]);

    useEffect(() => {
        observeStorage()
    }, []);


    const observeStorage = () => {
        const oldStorageTodoList = localStorage.getItem('todoList');
        const NewTodoList: TodoInterface[] = oldStorageTodoList ? JSON.parse(oldStorageTodoList) : [];
        setTodoList(NewTodoList);
    };

    useEffect(() => {
        window.addEventListener('storage', observeStorage);

        return () => {
            window.removeEventListener('storage', observeStorage)
        }
    }, []);


    return (
        <>
            <Header observeStorage={observeStorage} />

            {todoList ? todoList.map((todo, index) => <Todo
                key={index}
                index={index}
                observeStorage={observeStorage}
                todo={todo}
            />) : null}
        </>
    )
};

export default TodoList;