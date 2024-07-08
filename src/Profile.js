import React, { useState } from 'react';

function Profile({ user, setUser }) {
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((u) => (u.email === user.email ? { ...u, password: newPassword } : u));
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser({ ...user, password: newPassword });
    localStorage.setItem('loggedInUser', JSON.stringify({ ...user, password: newPassword }));
    setNewPassword('');
    alert('Password updated successfully');
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      <label>New Password:</label>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handlePasswordChange}>Change Password</button>
    </div>
  );
}

export default Profile;