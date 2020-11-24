import React from 'react';
import './styles/App.css';
import Container from '@material-ui/core/Container';
import TodoList from './modules/todolist/TodoList/TodoList';

function App() {

  return (
      <Container maxWidth="sm">
          <TodoList />
      </Container>
  );
}

export default App;
