import { useState } from "react";

function Tasks({ tasks, addTask, deleteTask, toggleStatus }) {
  const [title, setTitle] = useState("");

  function handleAdd() {
    if (title.trim() === "") return;
    addTask(title);
    setTitle("");
  }

  return (
    <div>
      <h1>Tasks</h1>

      <input
        type="text"
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>

      {tasks.length === 0 && <p>No tasks yet</p>}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-card ${task.status}`}
        >
          <div>
            <strong>{task.title}</strong>
            <p>Status: {task.status}</p>
          </div>

          <div>
            <button onClick={() => toggleStatus(task.id)}>
              Toggle
            </button>
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
