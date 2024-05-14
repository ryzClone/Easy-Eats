import React, { useState } from "react";
import "../style/Login.css";

import Logo from "../icons/logo.png";
import Hide from "../icons/hide.png";
import View from "../icons/view.png";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [login, setName] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);
  const navigate = useNavigate();
  function eyeClick() {
    setEye(!eye);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      field: login,
      object: password,
    };
    fetch("http://easy-eats.uz:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("jwtToken", data.data.token);
        localStorage.setItem("userName", data.data.username);
        localStorage.setItem("role", data.data.role);
        navigate("/easy-eats");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginPage">
      <form className="loginPage-form" onSubmit={handleSubmit}>
        <div className="loginPage-text">
          <h1>Welcome</h1>
          <img src={Logo} alt="" />
        </div>
        <div className="loginPage-input">
          <input
            type="text"
            value={login}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div className="loginPage-input">
          <input
            type={eye ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="loginPage-password"
            required
          />
          <img
            src={eye ? Hide : View}
            alt=""
            className="eye"
            onClick={eyeClick}
          />
        </div>
        <input type="submit" value="LOGIN" className="loginPage-btn" />
      </form>
    </div>
  );
}
