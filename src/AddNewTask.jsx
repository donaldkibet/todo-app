import React, { useState } from "react";

function AddNewTask({ tasks, setTasks }) {
  const [title, setTitle] = useState("");

  const handleOnChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAddTask = () => {
    const newTask = { id: tasks.length + 1, title: title, completed: false };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  return (
    <div>
      <input
        value={title}
        onChange={handleOnChange}
        type="text"
        placeholder="Add new task"
      />
      <button disabled={title.length === 0} onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
}

export default AddNewTask;
