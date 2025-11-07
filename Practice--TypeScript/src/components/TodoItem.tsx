import { useContext } from 'react'
import { TodosContext } from '../context/todos-context'
import classes from './TodoItem.module.css'
// 클래스를 타입으로 사용할 수 있음
import Todo from '../models/todo'

export default function TodoItem({ id, text }: Todo) {
  const { removeTodo } = useContext(TodosContext)

  function handleRemoveTodo() {
    removeTodo(id)
  }

  return (
    <li className={classes.item} onClick={handleRemoveTodo}>
      {text}
    </li>
  )
}
