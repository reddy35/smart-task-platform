import React from "react";

export default function TaskList({ tasks }) {
  return (
    <div className="task-table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="task-row">
              <td>{t.title}</td>
              <td>{t.assignee_email}</td>
              <td>{t.status}</td>
              <td>{t.priority}</td>
              <td>{t.due_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
