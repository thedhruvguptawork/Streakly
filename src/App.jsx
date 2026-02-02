import { useState, useEffect } from "react";

import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Habits from "./pages/Habits";
import Tasks from "./pages/Tasks";
import "./styles/layout.css";

// -------- Helper --------
function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function App() {
  // -------- Navigation --------
  const [currentPage, setCurrentPage] = useState("dashboard");

  // -------- Tasks (LocalStorage) --------
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // -------- Habits (LocalStorage) --------
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  // -------- Persist to LocalStorage --------
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // -------- Habit Logic --------
  function markHabitDone(id) {
    const today = new Date();

    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) return habit;

        if (habit.lastCompleted) {
          const last = new Date(habit.lastCompleted);

          // already done today
          if (isSameDay(last, today)) return habit;

          // yesterday → continue streak
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);

          if (isSameDay(last, yesterday)) {
            return {
              ...habit,
              streak: habit.streak + 1,
              lastCompleted: today.toDateString(),
            };
          }
        }

        // first time OR missed day
        return {
          ...habit,
          streak: 1,
          lastCompleted: today.toDateString(),
        };
      })
    );
  }

  function addHabit(title) {
    setHabits([
      ...habits,
      {
        id: Date.now(),
        title,
        streak: 0,
        lastCompleted: null,
      },
    ]);
  }

  function deleteHabit(id) {
    setHabits(habits.filter((h) => h.id !== id));
  }

  // -------- Task Logic --------
  function addTask(title) {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        status: "pending",
      },
    ]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function toggleStatus(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
  }

  // -------- UI --------
  return (
    <div className="app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="main">
        {currentPage === "dashboard" && <Dashboard tasks={tasks} />}

        {currentPage === "tasks" && (
          <Tasks
            tasks={tasks}
            addTask={addTask}
            deleteTask={deleteTask}
            toggleStatus={toggleStatus}
          />
        )}

        {currentPage === "habits" && (
          <Habits
            habits={habits}
            addHabit={addHabit}
            deleteHabit={deleteHabit}
            markDone={markHabitDone}
          />
        )}
      </div>
    </div>
  );
}

export default App;
