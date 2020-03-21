import React, { Component } from 'react';
import Can, { AbilityContext } from './Can';
import { Todo } from '../services/todo-storage';

export interface Props {
  todo: Todo
  onEdited(todo: Todo): void
  onRemove(todo: Todo): void
  onComplete(todo: Todo, completed: boolean): void
};

type State = Readonly<{ isEditing: boolean, editingTitle: string }>;

export default class TodoItem extends Component<Props, State> {
  static contextType = AbilityContext;

  refs!: {
    editInput: HTMLInputElement
  };

  state = {
    editingTitle: '',
    isEditing: false,
  };

  private _doneEdit = () => {
    if (!this.state.isEditing) {
      return
    }

    if (!this.refs.editInput.value) {
      this._removeTodo()
    } else {
      this.props.onEdited({ ...this.props.todo, title: this.refs.editInput.value })
    }

    this._cancelEdit()
  }

  private _cancelEdit() {
    this.setState({ isEditing: false, editingTitle: '' });
  }

  private _doneOrCancelEdit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      this._doneEdit()
    } else if (event.keyCode === 27) {
      this._cancelEdit()
    }
  }

  private _removeTodo = () => {
    this.props.onRemove(this.props.todo)
  }

  private _editTodo = () => {
    console.log(this.context)
    if (!this.context.can('update', this.props.todo)) {
      return
    }

    this.setState({ isEditing: true });
    this.refs.editInput.focus()
  }

  private _updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ editingTitle: event.target.value });
  }

  private _getClassName() {
    const css = ['todo']

    if (this.props.todo.completed) {
      css.push('completed')
    }

    if (this.state.isEditing) {
      css.push('editing')
    }

    return css.join(' ')
  }

  private _completeTodo= (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onComplete(this.props.todo, event.target.checked)
  }

  render() {
    return (
      <li className={this._getClassName()}>
        <div className="view">
          <Can do="update" on={this.props.todo}>
            <input
              type="checkbox"
              checked={this.props.todo.completed}
              onChange={this._completeTodo}
              className="toggle"
            />
          </Can>
          <label onDoubleClick={this._editTodo}>{this.props.todo.title}</label>
          <Can do="delete" on={this.props.todo}>
            <button className="destroy" onClick={this._removeTodo}></button>
          </Can>
        </div>
        <Can do="update" on={this.props.todo}>
          <input className="edit"
            type="text"
            ref="editInput"
            value={this.state.editingTitle || this.props.todo.title}
            onBlur={this._doneEdit}
            onKeyUp={this._doneOrCancelEdit}
            onChange={this._updateTitle} />
        </Can>
      </li>
    )
  }
}
