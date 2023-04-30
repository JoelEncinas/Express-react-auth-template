import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("http://127.0.0.1:4997/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            console.log("logged in");
            document.cookie = `token=${data.token}; expires=${new Date(
              Date.now() + 86400000
            )}; path=/`;
            navigate("/protected");
          });
        } else if (res.status === 401) {
          console.log("invalid credentials");
        } else if (res.status === 404) {
          console.log("user not found");
        } else {
          console.log("server err");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        // do login logic
        fetch("http://127.0.0.1:4997/protected", {
          headers: {
            "x-access-token": value,
          },
        })
          .then((res) => res.json())
          .then((data) => (data.isLoggedIn ? navigate("/protected") : null));
        break;
      }
    }
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => handleLogin(event)}>
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
        ></input>
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        ></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Login;
