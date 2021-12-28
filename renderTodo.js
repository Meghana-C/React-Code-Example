import React,{Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TodoList from './todoList';
import AddTodo from './addTodo';

class RenderTodo extends Component {
   constructor()
   {
       super();
       this.state={
          newAr:[]
       }
   }
  addData=()=>
  {
        let {newArr} = this.state;
       newArr.push(this.state.todoName);
       this.setState({newArr:newArr});
       console.log(this.state.newArr)
  }
  render() { 
    return ( 
      <div>
           <AddTodo  addData={(arr)=>this.addData(arr)}/>
           <TodoList />
         </div>
     );
  }
}
 
export default RenderTodo;
