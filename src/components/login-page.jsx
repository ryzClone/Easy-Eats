import React, { useState } from "react";
import "../style/Login.css";
import loginImage from "../img/login/loginpage.jpg";

import Logo from "../icons/logo.png";
import Hide from "../icons/hide.png";
import View from "../icons/view.png";
import { useNavigate } from "react-router-dom";
import { APIS } from "../API/api";

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
    if (login === "asd" || password === "123") {
      navigate("/easy-eats");
    }
    // fetch(`${APIS}auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     localStorage.setItem("jwtToken", data.data.token);
    //     localStorage.setItem("userName", data.data.username);
    //     localStorage.setItem("role", data.data.role);
    //     navigate("/easy-eats");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className="loginPage">
      <div className="loginPage-image">
        <img src={loginImage} alt="" className="loginPage-image-item" />
      </div>

      <form className="loginPage-form" onSubmit={handleSubmit}>
        <div className="loginPage-text">
          <img src={Logo} alt="" />
        </div>

        <div className="loginPage-input-body">
          <div className="loginPage-input">
            <input
              type="text"
              value={login}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
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
        </div>

        <div className="loginPage-input-btn">
          <input type="submit" value="LOGIN" className="loginPage-btn" />
        </div>
      </form>
    </div>
  );
}
