import React from 'react';
import TodoItem from './TodoItem';

export default function TodoListRenderer(props) {
  const { items, ...todoProps } = props
  if (!items.length) {
    return '';
  }

  return (
    <section className="main">
      <ul className="todo-list">
        {items.map(todo => <TodoItem {...todoProps} todo={todo} key={todo.id} />)}
      </ul>
    </section>
  )
}
