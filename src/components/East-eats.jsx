import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../style/Easy-eats.css";

import Logo from "../icons/logo.png";
import Users from "../icons/users.png";
import Categories from "../icons/categories.png";
import Meals from "../icons/meals.png";

import LogOut from "../icons/logOut.png";

const EasyEats = () => {
  const [gych, setGych] = useState(false);

  const Name = localStorage.getItem("userName");
  const Role = localStorage.getItem("role").toLowerCase();

  useEffect(() => {
    const data = localStorage.getItem("jwtToken"); // 'key' nomli ma'lumotni olish

    if (!data) {
      window.location.pathname = "/";
    }
  }, []);

  function Gych() {
    setGych(!gych);
    const EasyMain = document.querySelector(".easy-main");
    const EasyHeader = document.querySelector(".easy-header");
    const EasySection = document.querySelector(".easy-section");
    const EasyAside = document.querySelector(".easy-aside");
    const EasyEatsText = document.querySelector(".easy-eats-body-title-text");
    const EasyEatsBody = document.querySelector(".easy-aside-body");
    const EasyEatsBodyTitle = document.querySelector(".easy-eats-body-title");

    if (gych) {
      EasyMain.style.gridTemplateColumns = "repeat(12, 1fr)";
      EasyAside.style.gridArea = " 1 / 1 / 15 / 3";
      EasyEatsBody.style.alignItems = "flex-start";
      EasyHeader.style.gridArea = "1 / 3 / 2 / 13";
      EasySection.style.gridArea = "2 / 3 / 15 / 13";
      EasyEatsText.style.display = "block";
      EasyEatsBodyTitle.style.justifyContent = "flex-start";
    } else {
      EasyMain.style.gridTemplateColumns = "repeat(36, minmax(0, 1fr))";
      EasyAside.style.gridArea = "1 / 1 / 15 / 3";
      EasyEatsBody.style.alignItems = "center";
      EasyHeader.style.gridArea = "1 / 3 / 2 / 37";
      EasySection.style.gridArea = "2 / 3 / 15 / 37";
      EasyEatsText.style.display = "none";
      EasyEatsBodyTitle.style.justifyContent = "center";
    }
  }

  return (
    <main className="easy-main">
      <div className="easy-aside">
        <div className="easy-aside-body">
          <div className="easy-eats-body-title">
            <div className="easy-eats-body-title-icon">
              <img src={Logo} alt="" />
            </div>

            <div className="easy-eats-body-title-text">
              <div className="easy-eats-body-title-text-title">Easy Eats</div>

              <div className="easy-eats-body-title-text-subtitle">
                Free Menu
              </div>
            </div>
          </div>

          <ul>
            <Link to="/easy-eats" className="li-text" title="Easy Eats">
              <div className="li-block">
                <img src={Logo} alt="" />
                <div className="li-block-text">Easy Eats</div>
              </div>
            </Link>
            <Link to="/easy-eats/users" className="li-text" title="Users">
              <div className="li-block">
                <img src={Users} alt="" />
                <div className="li-block-text">Users</div>
              </div>
            </Link>
            <Link
              to="/easy-eats/catigories"
              className="li-text"
              title="Catigories"
            >
              <div className="li-block">
                <img src={Categories} alt="" />
                <div className="li-block-text">Catigories</div>
              </div>
            </Link>
            <Link to="/easy-eats/meals" className="li-text" title="Meals">
              <div className="li-block">
                <img src={Meals} alt="" />
                <div className="li-block-text">Meals</div>
              </div>
            </Link>
          </ul>
        </div>
      </div>

      <div className="easy-header">
        <div className="easy-aside-gych" id="gych-block" onClick={() => Gych()}>
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="easy-headr-body">
          <div className="easy-headr-body-text">
            <div className="easy-headr-text-title"> {Name}</div>
            <div className="easy-headr-text-subtitle"> {Role}</div>
          </div>

          <div className="easy-headr-body-icons">
            <ul>
              <Link
                to="/"
                className="easy-aside-gych"
                title="Log Out"
                onClick={(e) => localStorage.removeItem("jwtToken")}
              >
                <img src={LogOut} alt="" />
              </Link>
            </ul>
          </div>
        </div>
      </div>

      <div className="easy-section">
        <Outlet />
      </div>
    </main>
  );
};

export default EasyEats;
