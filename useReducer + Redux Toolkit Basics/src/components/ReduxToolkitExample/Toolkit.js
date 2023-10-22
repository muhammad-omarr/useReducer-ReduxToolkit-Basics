import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../../state/slices/todoSlice";

const Toolkit = () => {
  const [taskInput, settaskInput] = useState("");
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todo.tasks);
  console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskInput) {
      dispatch(addTodo(taskInput));
    } else {
      alert("Enter a task!!!");
    }
    settaskInput("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <>
      <div>
        <h1>Redux Toolkit Example</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Task Here"
            value={taskInput}
            onChange={(e) => {
              settaskInput(e.target.value);
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h1>Task List:</h1>
        <ul>
          {list.map((item) => {
            return (
              <li key={item.id}>
                {item.text}
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Toolkit;
