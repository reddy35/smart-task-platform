const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost/api";

export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/tasks/`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`${API_BASE}/tasks/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats/`);
  return res.json();
}
