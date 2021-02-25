import React, { useState } from "react";
import "./App.css";


function App() {
  const [todo, setTodo] = useState(getTodosLocalStorage());
  const [userInput, setInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [todoIndex, setTodoIndex] = useState();

  function getTodosLocalStorage(){
    let todosFromLocalStorage = localStorage.getItem("todos");
    if(todosFromLocalStorage == null) {
      localStorage.setItem("todos", JSON.stringify([]))
      return [];
    }
    return JSON.parse(todosFromLocalStorage)
  }

  function setTodosLocalStorage(tempTodos) {
    localStorage.setItem("todos", JSON.stringify(tempTodos))
  }

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleSubmit() {
    console.log(todo);
    if(userInput === "") {
      alert("Please provide a todo")
      return;
    }
    let updatedTodo = [...todo];
    updatedTodo.push(userInput);
    setTodosLocalStorage(updatedTodo)
    setTodo(updatedTodo);
    setInput("");
  }

  function handleEdit(index) {
    let updatedTodo = [...todo];
    updatedTodo[index] = userInput;
    setTodosLocalStorage(updatedTodo)
    setTodo(updatedTodo);
    setInput("");
    setIsEdit(false);
  }

  function handleDelete(index) {
    //now we will use the index passed onto this function to remove the item associated with it from the todos array

    //there is a way to get that item removed from the array which is like so...

    let tempTodos= [...todo]
  tempTodos.splice(index, 1);
  setTodosLocalStorage(tempTodos)
  setTodo(tempTodos);
  }

  function handleChange(index){
    setTodoIndex(index)
    setIsEdit(true)
    let td = todo[index];
    setInput(td)
  }

  return (
    <div className="main">
      <div className="header">
        <h1>Todo App</h1>
      </div>
      <input className="middle"
        onChange={handleInput}
        type="text"
        placeholder="enter todo"
        value = {userInput}
        
        
        
      ></input>
      <button className="bottom" onClick={!isEdit ? handleSubmit : () => handleEdit(todoIndex)}>
        {isEdit ? "Edit todo" : "Add todo"}
      </button>

      {todo.map((todo,index) => (
        <div key={index}>
          <p style={{display: "inline"}}>{index+1}</p>{" "}
          <p style={{display: "inline"}}>{todo}</p>
          <button className="endedit" onClick={() => handleChange(index)}>
            Edit
          </button>
          {//onClick is a listener 
          //handledelete that you defined is just a function
          //handlDelete can take parameters since it is just a function 
          //e.g handleDelete(3)
          //this 3 here is the parameter which signifies the index of the item we want to delete
        }
          <button className="end" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
