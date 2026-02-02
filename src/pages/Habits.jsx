import { useState } from "react";

function Habits({ habits, addHabit, deleteHabit, markDone }) {
  const [title, setTitle] = useState("");

  function handleAdd() {
    if (title.trim() === "") return;
    addHabit(title);
    setTitle("");
  }

  return (
    <div>
      <h1>Habits</h1>

      <input
        type="text"
        placeholder="New habit"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add Habit</button>

      {habits.length === 0 && <p>No habits yet</p>}

      {habits.map((habit) => (
        <div key={habit.id} className="habit-card">
          <div>
            <strong>{habit.title}</strong>

            <div className="streak-badge">
              🔥 {habit.streak} day streak
            </div>

            <div className="progress-wrapper">
              <div
                className="progress-bar"
                style={{ width: `${Math.min(habit.streak * 10, 100)}%` }}
              />
            </div>
          </div>

          <div>
            <button
              disabled={
                habit.lastCompleted &&
                new Date(habit.lastCompleted).toDateString() ===
                  new Date().toDateString()
              }
              onClick={() => markDone(habit.id)}
            >
              {habit.lastCompleted &&
              new Date(habit.lastCompleted).toDateString() ===
                new Date().toDateString()
                ? "Done Today"
                : "Mark Done"}
            </button>

            <button onClick={() => deleteHabit(habit.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Habits;
