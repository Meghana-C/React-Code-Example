let todoArr = [];
let todoForm = document.querySelector('.add-btn');
let items = document.querySelector('#items');
let todoList = document.querySelector('#todo-list');


window.onload = function()
{
/*** Add Todo
 *  @function todoArr
 *  
 */
todoForm.onclick = function addTodo()
{
   var todoObj ={ id:todoArr.length+1,title:items.value};
   todoArr.push(todoObj);
   todoListFunc();
   items.value ='';
}
/*****
 * @param  id
 * 
 */
function removeTodo(id)
{ 
     for(var i in todoArr)
     {
         
         if(todoArr[i].id == id)
         {
             todoArr.splice(i,1);
             break;
         }
     }
}
/**@function todoListFunc**
 * 
 */
function todoListFunc() {
    todoList.innerHTML = '';
    todoArr.forEach(todos=>
        {
    todoList.innerHTML += '<li class="list-group-item">' + todos.title + `<button id=remove-btn${todos.id} style="margin-left:200px;position:relative">X</button>` +'</li>';
    
        document.getElementById(`remove-btn${todos.id}`).onclick= function()
        {
            removeTodo(todos.id);
            todoListFunc();
        }
        console.log("AfterLoop",todos)

    })
}
todoListFunc();

}

