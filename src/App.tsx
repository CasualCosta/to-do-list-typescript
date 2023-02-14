import React, {useState} from 'react';
import './App.css';
import InputField from './components/InputField';
import Todo from './components/Todo';
import TodoList from './components/TodoList';

const App : React.FC = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) : void => {
    e.preventDefault()
    if(!todo)
      return;
    setTodos([...todos, {id: crypto.randomUUID(), name: todo, isDone: false}])
    setTodo('')
  }
  const completeTodo = (id: string) : void => {
    const task = todos.find((todo) => todo.id === id)
    if(typeof task === 'undefined')
      throw new Error('No task found')
    setTodos(todos.filter((todo) => todo.id !== id))
    setCompletedTodos([...completedTodos, task])
  }
  const cancelCompletion = (id: string) : void => {
    const task = completedTodos.find((todo) => todo.id === id)
    if(typeof task === 'undefined')
      throw new Error('No task found')
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id))
    setTodos([...todos, task])
  }
  
  const deleteIncomplete = (id: string) : void => 
    setTodos(todos.filter((todo) => todo.id !== id))
  const deleteCompleted = (id: string) : void => 
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id))
  
  const editIncomplete = (id: string, value: string) : void => {
    setTodos(
      todos.map((task) => (task.id === id) ? {...task, name: value} : task )
    )
  }
  const editCompleted = (id: string, value: string) : void => {
    setCompletedTodos(
      completedTodos.map((task) => (task.id === id) ? {...task, name: value} : task )
    )
  }

  

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList 
        todos={todos} 
        completedTodos={completedTodos}
        completeTodo={completeTodo} 
        cancelCompletion={cancelCompletion}
        deleteIncomplete={deleteIncomplete}
        deleteCompleted={deleteCompleted}
        editIncomplete={editIncomplete}
        editCompleted={editCompleted}
      />
    </div>
  );
}

export default App;
