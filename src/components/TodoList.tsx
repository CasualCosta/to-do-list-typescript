import React from 'react'
import Todo from './Todo'
// import "./styles.css";
import SingleTodo from './SingleTodo';

interface Props {
    todos: Todo[]
    completedTodos: Todo[]
    deleteIncomplete: (id: string) => void
    deleteCompleted: (id: string) => void
    completeTodo: (id: string) => void
    cancelCompletion: (id: string) => void
    editIncomplete: (id: string, value: string) => void
    editCompleted: (id: string, value: string) => void
}

const TodoList:React.FunctionComponent<Props> = ({todos, completedTodos, completeTodo, 
  cancelCompletion, editCompleted, editIncomplete, deleteCompleted, deleteIncomplete}: Props) => {
  return (
    <div className="container">
      <div className='todos'>
        <span className='todos__heading'>Active Tasks</span>
          {todos.map((todo:Todo) => {
            return(
              <SingleTodo key={todo.id} todo={todo} toggleCompletion={completeTodo} 
              deleteTodo={deleteIncomplete} editTodo={editIncomplete} />
            )
          })}
      </div>
      <div className="todos">
        <span className='todos__heading'>Completed Tasks</span>
        <div className="todos__heading">
            {completedTodos.map((todo:Todo) => {
              return(
                <SingleTodo key={todo.id} todo={todo} toggleCompletion={cancelCompletion} 
                deleteTodo={deleteCompleted} editTodo={editCompleted} />
                )
              })}
        </div>
      </div>
    </div>
  )
}

export default TodoList