import { useState } from "react";
import axios from "axios";

function UserLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8000/auth/login/",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      window.location.href = "/";

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>User Login</h2>

      <form onSubmit={login}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default UserLogin;