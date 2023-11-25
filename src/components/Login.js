// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/Users';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = () => {
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      onLogin(user);
      navigate('/');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
