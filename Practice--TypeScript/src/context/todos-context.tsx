import { createContext, ReactNode, useState } from 'react'
import Todo from '../models/todo'

interface TodosContextValue {
  items: Todo[]
  addTodo: (text: string) => void
  removeTodo: (id: string) => void
}

export const TodosContext = createContext<TodosContextValue>({
  items: [],
  addTodo: () => {},
  removeTodo: () => {},
})

export default function TodosContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [todos, setTodos] = useState<Todo[]>([new Todo('Learn React')])

  function addTodo(text: string) {
    const newTodo = new Todo(text)
    setTodos([...todos, newTodo])
  }
  function removeTodo(id: string) {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  return (
    <TodosContext.Provider value={{ items: todos, addTodo, removeTodo }}>
      {children}
    </TodosContext.Provider>
  )
}
