import React from 'react'
// 클래스는 Type 역할도 함
import Todo from '../models/todo'

// React.FC<타입>: Props 타입을 정하는 레거시 방법
const Todos: React.FC<{ items: Todo[] }> = props => {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  )
}

export default Todos
