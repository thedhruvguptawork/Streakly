import { useState } from "react";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import Habits from "./pages/Habits";
import Tasks from "./pages/Tasks";
import "./styles/layout.css"


function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function App() {


<h1>Add Tasks</h1>

  const [currentPage, setCurrentPage] = useState("dashboard");

  const [tasks, setTasks] = useState([]);

  const [habits, setHabits] = useState([]);


  function markHabitDone(id) {
    const today = new Date();

    setHabits(
      habits.map((habit) => {
        if (habit.id !== id) return habit;

        if (habit.lastCompleted) {
          const last = new Date(habit.lastCompleted);

          // already done today
          if (isSameDay(last, today)) {
            return habit;
          }

          // yesterday done → continue streak
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

        // missed day OR first time
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
    setHabits(habits.filter((habit) => habit.id !== id));
  }




  function addTask(title) {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: title,
        status: "pending",
      },
    ]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleStatus(id) {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      )
    );
  }





  return (
    <div className="app">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

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