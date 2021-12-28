import React,{Component} from 'react';

class AddTodo extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state= {
    //         todoName:'',
    //     }
    // }
    // handleChange(e)
    // {
    //    e.preventDefault();
    //    this.setState({[e.target.name]:e.target.value})
    // }
    // AddTodo=(details)=>
    // {
    //     details = this.state.todoName;
    //    this.setState({details:details})
    //     this.props.addData(details)
    // }
    constructor(props){
        super(props);
        this.state = { 
            name : "Meghana"
         }
      
        }
        
      btnClick=()=>
      {
          
         this.setState({name:"Chintanaboina"})
         console.log("fbvcb",this.state.name)
      }
      
    render() { 
        console.log("Meghana",this.props)
        return ( 
            <div>  
                <div style={{marginTop:"50px"}}>
                    <input type='text' placeholder='Add Todo..'
                     name='todoName' value={this.state.todoName}
                     onChange ={(e)=>this.handleChange(e)}
                     ></input>
                    <button onClick={this.btnClick} style={{marginLeft:"20px"}}>Save</button>
                </div>


            </div>
         );
    }
}
 
export default AddTodo;