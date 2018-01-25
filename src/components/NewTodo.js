import React, { Component } from 'react';

export default class NewTodo extends Component {
  state = {
    title: '',
    assignee: ''
  }

  updateTodoTitle(event) {
    this.setState({ title: event.target.value })
  }

  updateTodoAssignee(event) {
    this.setState({ assignee: event.target.value })
  }

  addTodo(event) {
    if (event.keyCode !== 13) {
      return
    }

    this.props.onNewTodo({ ...this.state })
    this.setState({ title: '', assignee: '' })
  }

  render() {
    return (
      <div className="new-todo">
        <input
          name="title"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={this.state.title}
          onInput={this.updateTodoTitle.bind(this)}
          onKeyUp={this.addTodo.bind(this)} />

        <select name="assignee" value={this.state.assignee} onChange={this.updateTodoAssignee.bind(this)}>
          <option value="" disabled>Choose Assignee</option>
          <option>me</option>
          <option>John Doe</option>
          <option>Alex Pupkin</option>
        </select>
      </div>
    );
  }
}
