import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchTasks } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-logo">Smart Task Platform</div>
        <nav className="app-nav">
          <button>Dashboard</button>
          <button>Tasks</button>
          <button>Settings</button>
        </nav>
      </header>

      <main className="app-content">
        <section className="card">
          <div className="card-header">
            <h3 className="card-title">Create / Update Task</h3>
            <span className="badge">Celery-powered reminders</span>
          </div>
          <TaskForm onCreated={loadTasks} />
        </section>

        <section className="card">
          <Dashboard />
        </section>

        <section className="card" style={{ gridColumn: "1 / -1" }}>
          <div className="card-header">
            <h3 className="card-title">All Tasks</h3>
          </div>
          <TaskList tasks={tasks} />
        </section>
      </main>
    </div>
  );
}
