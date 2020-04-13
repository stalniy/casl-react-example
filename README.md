# CASL and React integration example 

## DEPRECATED

The example has been moved to https://github.com/stalniy/casl-examples/tree/master/packages/react-todo

This example shows how to integrate CASL auhorization (i.e. permissions) in React application. Read [Managing user permissions in React app](https://medium.com/dailyjs/managing-user-permissions-in-your-react-app-a93a94ff9b40) for detailed explanation.

> Generated with react-app

**Note**: refactored to use CASL 2.0. See [@casl/ability][casl-ability] and [@casl/react][casl-react] for details.

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
  <Can do="update" on={this.props.todo}>
    <input className="toggle" type="checkbox" checked={this.props.todo.completed} onChange={this.completeTodo.bind(this)} />
  </Can>
  <label onDoubleClick={this.editTodo.bind(this)}>{this.props.todo.title}</label>
  <Can do="delete" on={this.props.todo}>
    <button className="destroy" onClick={this.removeTodo.bind(this)}></button>
  </Can>
</div>
```

[casl-ability]: https://github.com/stalniy/casl/tree/master/packages/casl-ability
[casl-react]: https://github.com/stalniy/casl/tree/master/packages/casl-react
