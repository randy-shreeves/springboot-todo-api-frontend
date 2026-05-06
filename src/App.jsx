import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://springboot-todo-api-z09g.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();
      console.log("TOKEN:", data.token);
      localStorage.setItem("token", data.token);

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://springboot-todo-api-z09g.onrender.com/tasks", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log("TASKS:", data);
    } catch (error) {
      console.error("Fetch tasks failed", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      <h2>Login</h2>

      <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Login</button>
      <button onClick={fetchTasks}>Get Tasks</button>
    </div>
  
  );
}

export default App
