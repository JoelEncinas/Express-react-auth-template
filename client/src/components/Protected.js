import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected() {
  const navigate = useNavigate();

  const [username, setUserName] = useState(null);

  function logout() {
    document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/login");
  }

  useEffect(() => {
    let hasCookie = false;
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "token") {
        hasCookie = true;
        fetch("http://127.0.0.1:4997/protected", {
          headers: {
            "x-access-token": value,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              res.json().then((data) => setUserName(data.username));
            } else if (res.status === 401) {
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
        break;
      }
    }

    if (hasCookie === false) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <h1>Protected route</h1>
      {username && <p>Hello {username}</p>}
    </div>
  );
}

export default Protected;
