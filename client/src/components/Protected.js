import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected() {
  const navigate = useNavigate();

  const [username, setUserName] = useState(null);

  useEffect(() => {
    let hasCookie = false;
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        fetch("http://127.0.0.1:4997/protected", {
          headers: {
            "x-access-token": value,
          },
        })
          .then((res) => res.json())
          .then((data) =>
            data.isLoggedIn ? setUserName(data.username) : navigate("/login")
          );
        hasCookie = true;
        break;
      }
    }

    if (hasCookie === false) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>Protected route</h1>
      <p>{username}</p>
    </div>
  );
}

export default Protected;
