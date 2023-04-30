import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const user = {
      username: form[0].value,
      password: form[1].value,
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
            console.log(data);
            document.cookie = `token=${data.token}; expires=${new Date(
              Date.now() + 86400000
            )}; path=/`;
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

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => handleLogin(event)}>
        <label htmlFor="username">Username:</label>
        <input required type="text" id="username"></input>
        <label htmlFor="password">Password:</label>
        <input required type="password" id="password"></input>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Login;
