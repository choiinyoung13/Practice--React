import { useContext } from 'react'
import TodoItem from './TodoItem'
import { TodosContext } from '../context/todos-context'
import classes from './Todos.module.css'

const Todos = () => {
  const { items } = useContext(TodosContext)

  return (
    <ul className={classes.todos}>
      {items.map(item => (
        <TodoItem key={item.id} id={item.id} text={item.text} />
      ))}
    </ul>
  )
}

export default Todos
