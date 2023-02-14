import React, { FormEvent, useEffect, useRef, useState } from 'react'
import Todo from './Todo'
import {AiFillEdit, AiFillDelete} from 'react-icons/ai'
import {MdDone} from 'react-icons/md'

type Props = {
    todo: Todo
    toggleCompletion: (id: string) => void
    editTodo: (id: string, value: string) => void
    deleteTodo: (id: string) => void
}

const SingleTodo = ({todo, toggleCompletion, editTodo, deleteTodo}: Props) => {
  const {name, id} = todo
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [edit, setEdit] = useState<string>(todo.name)

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [isEditing])

  const handleEdit = (e: React.FormEvent) : void => {
    e.preventDefault()
    editTodo(id, edit)
    setIsEditing(false)
  }

  const toggleEdit = () : void => {
    if(!isEditing){
      setIsEditing(true)
      return
    }
    setIsEditing(false)
    setEdit(name)
  }

  return (
    <form className='todos__single'
      onSubmit={(e) =>handleEdit(e)}
    >
      <span className="todos__single--text"> 
        {isEditing ? (
          <input
            value={edit}
            onChange={(e)=> setEdit(e.target.value)}
            className='todos__single--text'
            ref={inputRef}
          />
        ) : 
          <span className='todos__single--text'>{name}</span>
        }

      </span>
      <div>
          <span className='icon' onClick={toggleEdit}><AiFillEdit /></span>
          <span className='icon' onClick={() => deleteTodo(id)}><AiFillDelete /></span>
          <span className='icon' onClick={() => toggleCompletion(id)}><MdDone /></span>
      </div>
    </form>
  )
}

export default SingleTodo