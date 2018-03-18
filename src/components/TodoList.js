import React, { Component } from 'react';
import todoStorage from '../services/todo-storage';
import NewTodo from './NewTodo';
import TodoListRenderer from './TodoListRenderer';
import Can from './Can';

export default class TodoList extends Component {
  state = {
    items: todoStorage.fetch()
  }

  componentDidUpdate() {
    todoStorage.save(this.state.items)
  }

  addTodo(attrs) {
    const todo = todoStorage.build(attrs)

    this.setState((prevState) => {
      return {
        items: prevState.items.concat(todo)
      }
    })
  }

  removeTodo(todo) {
    this.setState((prevState) => ({
      items: prevState.items.filter(item => item !== todo)
    }))
  }

  editTodo(todo) {
    this.setState((prevState) => {
      const items = prevState.items.slice(0)
      const index = items.findIndex(item => item.id === todo.id)

      items.splice(index, 1, todo)

      return { items }
    })
  }

  completeTodo(todo, isCompleted) {
    todo.completed = isCompleted
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <header className="header">
          <h1>Todos</h1>
          <Can do="create" on="Todo">
            <NewTodo onNewTodo={this.addTodo.bind(this)} />
          </Can>
        </header>
        <TodoListRenderer
          items={this.state.items}
          onRemove={this.removeTodo.bind(this)}
          onEdited={this.editTodo.bind(this)}
          onComplete={this.completeTodo.bind(this)}
          />
      </div>
    )
  }
}
