import { useContext, useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { GlobalContext } from "./context/Context";
import { doc } from "firebase/firestore";

function App() {
  const { todos, setTodos, input, setInput, addTodo } = useContext(GlobalContext);
  


  function search(e) {
    if (event.key === "Enter") {
      console.log('enter')
      addTodo(e);
    }
  }

  console.log("outer", todos);

  return (
    <div className="todo-container">
      <nav className="header">
        <h1>Manage Your Todo List</h1>
      </nav>
      <div className="content">
        <div className="input-todo">
          <input
            type="text"
            placeholder="What todo next?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
          <button onClick={addTodo}>Add Todo</button>
        </div>
        <div className="todos">
          {todos != [] && todos.length > 0 ? (
            todos.map((data) => <Todo todoData={data} key={data.id} />)
          ) : (
            <h1>no data yet</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
