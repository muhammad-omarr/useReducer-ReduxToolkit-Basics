import { useReducer, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ReducerPrac = () => {
  const reducer = (list, action) => {
    switch (action.type) {
      case "add-to-list":
        return [...list, newTask(action.payload.task)];
      case "toggle":
        return list.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, complete: !item.complete };
          }
          return item;
        });
      case "delete":
        return list.filter((item) => {
          return item.id !== action.payload.id;
        });
      default:
        return list;
    }
  };

  const newTask = (task) => {
    return { id: uuidv4(), name: task, complete: false };
  };
  const [task, setTask] = useState(" ");
  const [list, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "add-to-list", payload: { task } });
    setTask("");
  };

  const handleToggle = (id) => {
    dispatch({ type: "toggle", payload: { id } });
  };
  const handleDelete = (id) => {
    dispatch({ type: "delete", payload: { id } });
  };
  return (
    <div className="container">
      <h1>Reducer Practice!</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ENTER TASK HERE"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        ></input>
        <button type="submit">SUBMIT</button>
      </form>
      <div>
        <h3>TASK LIST:</h3>
        <ul>
          {list.map((item) => {
            return (
              <li
                key={item.id}
                style={{ color: item.complete ? "#eae8e4" : "black" }}
              >
                {item.name}
                <button onClick={() => handleToggle(item.id)}>TOGGLE</button>
                <button onClick={() => handleDelete(item.id)}>DELETE</button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ReducerPrac;
