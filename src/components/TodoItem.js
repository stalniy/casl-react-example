import React, { Component } from 'react';
import Can from './Can';

export default class TodoItem extends Component {
  state = {
    isEditing: false,
    editedTitle: ''
  }

  componentDidMount() {
    this.editedTitle = this.props.todo.title
  }

  doneEdit() {
    if (!this.state.isEditing) {
      return
    }

    if (!this.refs.editInput.value) {
      this.removeTodo()
    } else {
      this.props.onEdited({ ...this.props.todo, title: this.refs.editInput.value })
    }

    this.cancelEdit()
  }

  cancelEdit() {
    this.setState({ isEditing: false })
  }

  doneOrCancelEdit(event) {
    if (event.keyCode === 13) {
      this.doneEdit()
    } else if (event.keyCode === 27) {
      this.cancelEdit()
    }
  }

  removeTodo() {
    this.props.onRemove(this.props.todo)
  }

  editTodo() {
    if (!this.refs.mayUpdateTodo.allowed) {
      return
    }

    this.setState({
      isEditing: true,
    })
    this.refs.editInput.focus()
  }

  updateTitle(event) {
    this.setState({ editedTitle: event.target.value })
  }

  getClassName() {
    const css = ['todo']

    if (this.props.todo.completed) {
      css.push('completed')
    }

    if (this.state.isEditing) {
      css.push('editing')
    }

    return css.join(' ')
  }

  completeTodo(event) {
    this.props.onComplete(this.props.todo, event.target.checked)
  }

  render() {
    return (
      <li className={this.getClassName()}>
        <div className="view">
          <Can do="update" on={this.props.todo} ref="mayUpdateTodo">
            <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.completeTodo.bind(this)} />
          </Can>
          <label onDoubleClick={this.editTodo.bind(this)}>{this.props.todo.title}</label>
          <Can do="delete" on={this.props.todo}>
            <button className="destroy" onClick={this.removeTodo.bind(this)}></button>
          </Can>
        </div>
        <Can do="update" on={this.props.todo}>
          <input className="edit"
            type="text"
            ref="editInput"
            value={this.state.editedTitle || this.props.todo.title}
            onBlur={this.doneEdit.bind(this)}
            onKeyUp={this.doneOrCancelEdit.bind(this)}
            onChange={this.updateTitle.bind(this)} />
        </Can>
      </li>
    )
  }
}
