import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { GlobalContext } from "./context/Context";
import { doc } from "firebase/firestore";

function Todo({ todoData }) {
  const { deleteTodo, EditTodo, saveCheck } = useContext(GlobalContext);

  const [todoMsg, setTodoMsg] = useState(todoData.todo);
  const [checked, setChecked] = useState(todoData.checked);
  const [isEditable, setIsEditable] = useState(false);

  console.log(todoData.id)

  function handleCheckBox() {
    setChecked(!checked);
    saveCheck(todoData);
    if(isEditable==true) setIsEditable(false)
  }

  function handleOnChangeTodo(e) {
    setTodoMsg(e.target.value);
  }

  function toggleEdit() {
    setIsEditable(!isEditable);
    EditTodo(todoData);
  }

  

  return (
    <div
      className="todo"
      style={checked ? { backgroundColor: "rgb(135, 87, 29)" } : {}}
    >
      <div className="c1">
        <input type="checkbox" onChange={handleCheckBox} checked={checked} />
        <input
          className={checked ? `underline${!isEditable}` : `edit${!isEditable}`}
          type="text"
          value={todoMsg}
          onChange={handleOnChangeTodo}
          disabled={!isEditable}
        />
      </div>
      <div className="c2">
        <button id="b1" onClick={toggleEdit} disabled={checked}>
          {isEditable ? "Save" : "Edit"}
        </button>
        <button id="b2" onClick={() => deleteTodo(todoData.id)} value={todoData.id}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default Todo;
