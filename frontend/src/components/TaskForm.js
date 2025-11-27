import React, { useState } from "react";
import { createTask } from "../api";

export default function TaskForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assignee_email: "",
    priority: 3,
    due_at: "",
    reminder_at: "",
  });

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      priority: Number(form.priority),
      due_at: form.due_at ? new Date(form.due_at).toISOString() : null,
      reminder_at: form.reminder_at ? new Date(form.reminder_at).toISOString() : null,
    };
    await createTask(payload);
    onCreated && onCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <div className="form-label">Title</div>
        <input
          name="title"
          className="form-input"
          placeholder="Example: Deploy notification microservice"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="form-label">Description</div>
        <textarea
          name="description"
          className="form-textarea"
          placeholder="Short description of what needs to be done…"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-row-inline">
        <div>
          <div className="form-label">Assignee Email</div>
          <input
            name="assignee_email"
            className="form-input"
            placeholder="teammate@company.com"
            value={form.assignee_email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="form-label">Priority (1-5)</div>
          <input
            type="number"
            name="priority"
            className="form-input"
            min="1"
            max="5"
            value={form.priority}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row-inline">
        <div>
          <div className="form-label">Due At</div>
          <input
            type="datetime-local"
            name="due_at"
            className="form-input"
            value={form.due_at}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="form-label">Reminder At</div>
          <input
            type="datetime-local"
            name="reminder_at"
            className="form-input"
            value={form.reminder_at}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ marginTop: 6 }}>
        <button type="submit" className="btn btn-primary">
          + Save Task
        </button>
      </div>
    </form>
  );
}
