import { useState} from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleRegister = async () => {
        try {
            const response = await fetch(
                "https://springboot-todo-api-z09g.onrender.com/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            );
            if (!response.ok) {
                throw new Error("Registration failed");
            }
            console.log("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error("Register failed", error);
        }
    };

    return  (
        <div>
            <h1>Register</h1>
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
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default RegisterPage;