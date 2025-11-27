import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { fetchStats } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const s = await fetchStats();
      setStats(s);
    };
    load();
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  const labels = ["Pending", "In Progress", "Completed"];
  const values = [stats.pending, stats.in_progress, stats.completed];

  return (
    <div>
      <Plot
        data={[{ type: "pie", labels, values }]}
        layout={{ title: "Tasks by Status" }}
      />
      <p>Total: {stats.total}</p>
      <p>Completed today: {stats.completed_today}</p>
    </div>
  );
}
