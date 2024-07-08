import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === form.email && user.password === form.password);
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      navigate('/tasks');
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>Email:</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} required />
      <label>Password:</label>
      <input type="password" name="password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;