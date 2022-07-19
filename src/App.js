import { useState, useEffect, useRef } from "react";
import axios from "axios";
const App = () => {
  const taskElement = useRef();
  const dateElement = useRef();
  let id = useRef(3);
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios.get("http://localhost:8081/todos").then(({data}) => {
      console.log(data);
      setTodos(data.data)
    });
  }, []);

  const addTask = () => {
    const task = taskElement.current.value;
    const date = dateElement.current.value;
    id.current++;
    let _todos = [...todos]; //copy state
    console.log(id.current);
    _todos.push({ task, date, status: 0, id: id.current });
    setTodos(_todos);
  };

  const removeTask = (id) => {
    let _todos = [...todos]; //copy state
    const filteredTodos = _todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className="App">
      <div>
        <input ref={taskElement} />
        <input ref={dateElement} />
        <button onClick={addTask}>Add</button>
      </div>
      <button>sort by time</button>
      <div>
        {todos.map(({ id, task, date, status }) => {
          //console.log("id is **************** ", id);
          return (
            <div key={id}>
              <span>{task}</span>
              <button>{date}</button>
              <button onClick={() => removeTask(id)}>remove</button>
              <button>toggle</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
