import React from 'react'
import TodoForm from './TodoForm'
import Todos from './Todos'

function TodoApp() {
  return (
    <div>
        <h1>Todo List</h1>
        <TodoForm/>
        <Todos/>
    </div>
  )
}

export default TodoApp