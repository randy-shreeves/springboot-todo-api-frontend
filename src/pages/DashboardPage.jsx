import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DashboardPage() {

    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

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
        setTasks(data.content);
        console.log("FETCHED DATA:", data);
        } catch (error) {
        console.error("Fetch tasks failed", error);
        }
    };

  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://springboot-todo-api-z09g.onrender.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          description: description,
          status: "PENDING"
        })
      });

      const data = await response.json();
      fetchTasks();
      setDescription("");
      console.log("CREATED TASK:", data);
    } catch (error) {
      console.error("Create task failed", error);
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      const token = localStorage.getItem("token");

      const updatedTask = {
        ...task,
        status:
          task.status == "PENDING" ? "DONE" : "PENDING"
      };

      const response = await fetch(`https://springboot-todo-api-z09g.onrender.com/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedTask)
      }
    );

    const data = await response.json();
    console.log("UPDATED TASK:", data);
    fetchTasks();
    } catch (error) {
      console.error("Update task failed", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await fetch (`https://springboot-todo-api-z09g.onrender.com/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );
    console.log("TASK DELETED SUCCESSFULLY");
    fetchTasks();
    } catch (error) {
      console.error("Delete task failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <button onClick={fetchTasks}>Get Tasks</button>
      <br />
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={createTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description} - {task.status}
            <button onClick={() => updateTaskStatus(task)}>Toggle Status</button>
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

}

export default DashboardPage;