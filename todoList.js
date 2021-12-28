import React, { Component } from 'react';
import AddTodo from './addTodo';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           todoArr :['todolist1','todolist2']
        }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul style={{listStyle:"none"}}>
                    {
                        this.state.todoArr.map((newArr, index) => {
                            return (
                                <div>
                                <li key={index}>{newArr}</li> 
                                </div>
                             )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default TodoList;