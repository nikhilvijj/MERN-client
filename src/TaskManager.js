import React, { useState, useEffect } from 'react';

function TaskManager({ user }) {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ date: '', time: '', note: '' });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    setTasks(storedTasks[user.email] || []);
  }, [user.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const userTasks = storedTasks[user.email] || [];
    const updatedTasks = [...userTasks, task];
    storedTasks[user.email] = updatedTasks;
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    setTasks(updatedTasks);
    setTask({ date: '', time: '', note: '' });
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={task.date} onChange={handleChange} required />
        <label>Time:</label>
        <input type="time" name="time" value={task.time} onChange={handleChange} required />
        <label>Note:</label>
        <input type="text" name="note" value={task.note} onChange={handleChange} required />
        <button type="submit">Add Task</button>
      </form>
      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            {t.date} - {t.time} - {t.note}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;