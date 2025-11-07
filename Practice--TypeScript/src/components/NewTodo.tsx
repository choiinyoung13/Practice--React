import { FormEvent, useContext, useRef } from 'react'
import { TodosContext } from '../context/todos-context'
import classes from './NewTodo.module.css'

export default function NewTodo() {
  const { addTodo } = useContext(TodosContext)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (inputRef.current!.value.trim() === '') return
    addTodo(inputRef.current!.value)
    inputRef.current!.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="newTodo">New Todo</label>
      <input ref={inputRef} type="text" id="newTodo" />
      <button type="submit">Add Todo</button>
    </form>
  )
}
