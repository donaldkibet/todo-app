import React, { useState } from "react";
import AddNewTask from "./AddNewTask";
import "./TaskList.css";

const initialTasks = [
  { id: 1, title: "Learn ReactJS", completed: false },
  { id: 2, title: "Learn VueJS", completed: false },
  { id: 3, title: "Learn Angular", completed: false },
];

function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isEditingId, setIsEditingId] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleEdit = (id, title) => {
    setIsEditingId(id);
    setNewTitle(title);
  };

  const handleSave = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, title: newTitle };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIsEditingId("");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  };

  const handleOnComplete = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div>
      <AddNewTask setTasks={setTasks} tasks={tasks} />
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            {isEditingId === task.id ? (
              <>
                <input
                  value={newTitle}
                  onChange={(event) => setNewTitle(event.target.value)}
                  placeholder="Edit current task"
                />
                <button onClick={() => handleSave(task.id)}>Save</button>
              </>
            ) : (
              <div className="taskItem">
                <div
                  style={{
                    textDecoration: task.completed ? "line-through" : "",
                  }}
                >
                  <label htmlFor={task.id}>
                    <input
                      id={task.id}
                      onClick={() => handleOnComplete(task.id)}
                      type="checkbox"
                      checked={task.completed}
                    />
                    {task.title}
                  </label>
                </div>
                <button
                  disabled={task.completed}
                  onClick={() => handleEdit(task.id, task.title)}
                >
                  Edit
                </button>
                <button
                  disabled={task.completed}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default TaskList;
