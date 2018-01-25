import React, { Component } from 'react';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="todoapp">
        <TodoList />
      </div>
    );
  }
}

export default App;
