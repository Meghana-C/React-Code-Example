import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TodoList from './todoList';
import RenderTodo from './renderTodo';
import AddTodo from './addTodo';

class App extends Component {
 
  render() { 
    return ( 
      <div className="App">
        <AddTodo />
         </div>
     );
  }
}
 
export default App;
