# CASL and React integration example

This example shows how to integrate CASL auhorization (i.e. permissions) in React application.

> Generated with react-app

## Installation

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start
```

## Description

This application is a basic Todo application with possibility to specify assignee for a task. By default, all users are able to create and read all tasks but update and delete only assigned to them. Any user may create a task and assign it to other users.

Ability configuration can be found in `src/config/ability.js`, the React component which checks abilities is in `src/components/Can.js`. This component allows to check abilities and if it's allowed to perform an operation it renders children components, otherwise renders empty string.

## Example

```jsx  
<div className="view">
  <Can run="update" on={this.props.todo} ref="ability">
    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.completeTodo.bind(this)} />
  </Can>
  <label onDoubleClick={this.editTodo.bind(this)}>{this.props.todo.title}</label>
  <Can run="delete" on={this.props.todo}>
    <button className="destroy" onClick={this.removeTodo.bind(this)}></button>
  </Can>
</div>
```
