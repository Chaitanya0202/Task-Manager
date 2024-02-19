// src/App.js
import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // If editing, update the existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = { text: newTask, date: newTaskDate };
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // If not editing, add a new task
      setTasks([...tasks, { text: newTask, date: newTaskDate }]);
    }

    // Clear the input fields
    setNewTask("");
    setNewTaskDate("");
  };

  const editTask = (index) => {
    // Set the input fields with the task to be edited
    setNewTask(tasks[index].text);
    setNewTaskDate(tasks[index].date);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    // Remove task at the specified index
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    // Reset editIndex if the task being edited is deleted
    if (index === editIndex) {
      setEditIndex(null);
      setNewTask("");
      setNewTaskDate("");
    }
  };

  return (
    <div className="todo-app" style={{border:'2px solid black',borderRadius:'30px',margin: "28px 400px"}}>
      <header>
        <h1>Todo List</h1>
        <form onSubmit={addTask}>
          <input
            style={{
              flex: "1 1 0%",
              border:'2px solid black',
              padding: "1rem",
              borderRadius: "1rem",
              marginRight: "1rem",
              color: "var(--light)",
              fontSize: "1.25rem",
            }}
            type="text"
            value={newTask}
            className="ab"
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="What do you have planned?"
          />
          <input
            style={{
              flex: "1 1 0%",
              // backgroundColor: '#000000',
              padding: "1rem",
              borderRadius: "1rem",
              marginRight: "1rem",
              // color: 'var(--light)',
              border: "2px solid black ",
              fontSize: "1.25rem",
            }}
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            placeholder="Task date (optional)"
          />
          <input
            type="submit"
            value={editIndex !== null ? "Save task" : "Add task"}
          />
        </form>
      </header>
      <main>
        <section className="task-list">
          <h2>Tasks</h2>
          <div id="tasks">
          
            {tasks.map((task, index) => (
              <div key={index} className="task">
                <div className="content">
                  <input
                    className="text"
                    type="text"
                    value={task.text}
                    readOnly
                  />

                  {task.date && <p className="date">{task.date}</p>}
                </div>
                <div className="actions">
                  <button className="edit" onClick={() => editTask(index)}>
                    {editIndex === index ? "Cancel" : "Edit"}
                  </button>
                  <button className="delete" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TodoApp;
