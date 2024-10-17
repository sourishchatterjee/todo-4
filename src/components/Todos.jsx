
import React from 'react';
import { useSelector } from 'react-redux';
import Todo from './Todo';

function Todos() {
  const todos = useSelector((state) => state.todo);

  return (
    <div>
      {todos && todos.map(todo => (
        <Todo key={todo.id} {...todo} />
      ))}
    </div>
  );
}

export default Todos;
