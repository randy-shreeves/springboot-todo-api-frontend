import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

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
      console.log("TOKEN RETRIEVED FOR LOGIN:", data.token);
      localStorage.setItem("token", data.token);
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>

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
      <p>
        Don't have an account?
      </p>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );

}

export default LoginPage;