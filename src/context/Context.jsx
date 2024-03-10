import { createContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export const GlobalContext = createContext(null);

function Context({ children }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const EditTodo = async (id, todoMsg) => {
    //e.preventDefault();
    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        todo: todoMsg,
        checked: false,
      });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  };

  async function saveCheck(todo) {
    try {
      const todoRef = doc(db, "todos", todo.id);
      await updateDoc(todoRef, {
        todo: todo.todo,
        checked: !todo.checked,
      });
      console.log("updated");
    } catch (error) {
      console.log(error);
    }
  }

  const addTodo = async (e) => {
    e.preventDefault();
    let todo = {
      checked: false,
      todo: input,
    };
    try {
      if (input !== "") {
        const todoRef = collection(db, "todos");
        await addDoc(todoRef, todo);
      }
    } catch (error) {
      console.log(error);
    }
    setInput("");
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log("delete err: ", error);
    }
  };

  ////////////////////////////////////////

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosRef = collection(db, "todos");
        //const todosSnapshot = await getDocs(todosRef);// is slow

        onSnapshot(todosRef, (snapshot) => {
          const todosList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setTodos(todosList);
          return todosList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        todos,
        setTodos,
        deleteTodo,
        EditTodo,
        saveCheck,
        input,
        setInput,
        addTodo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default Context;
