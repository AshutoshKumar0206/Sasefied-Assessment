import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const API_URL = `${window.location.origin}/tasks`;

  //To fetch task from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // To Add a new Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    try {
      let taskExists = tasks.some((existingTask) => existingTask.toLowerCase() === task.toLowerCase());
      console.log(taskExists); //To check if task that we are adding already exists
      if(!taskExists){//if task doesn't exist then only we add a new task
        await axios.post(API_URL, { task });
      }  
      setTask("");
      const response = await axios.get(API_URL);
      console.log(response.data);
      setTasks(response.data);

    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
