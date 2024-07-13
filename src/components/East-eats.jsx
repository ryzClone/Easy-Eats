import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../style/Easy-eats.css";

import Logo from "../icons/Easy-eats/Home.svg";
import Users from "../icons/Easy-eats/2 Friends.svg";
import Usersgr from "../icons/Easy-eats/2 Friendsgr.png";
import Categories from "../icons/Easy-eats/Category.svg";
import Meals from "../icons/Easy-eats/Salami Pizza.svg";

import LogOut from "../icons/logOut.png";

const EasyEats = () => {
  const [gych, setGych] = useState(false);

  const Name = localStorage.getItem("userName");

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    const data = localStorage.getItem("jwtToken");
    if (!data) {
      window.location.pathname = "/";
    }

    setActiveLink(location.pathname);
  }, [location]);

  function Gych() {
    setGych(!gych);
    const EasyAside = document.querySelector(".easy-aside");
    const LiBlockText = document.querySelectorAll(".li-block-text");
    const EasyEatsText = document.querySelector(".easy-eats-body-title-text");
    const LiBlock = document.querySelectorAll(".li-text");

    if (gych) {
      EasyAside.style.width = "15%";

      LiBlockText.forEach((item) => {
        item.style.display = "block";
      });

      LiBlock.forEach((item) => {
        item.style.justifyContent = "flex-start";
      });

      setTimeout(() => {
        EasyEatsText.style.display = "block";
      }, 150);
    } else {
      EasyAside.style.width = "5%";

      LiBlockText.forEach((item) => {
        item.style.display = "none";
      });

      LiBlock.forEach((item) => {
        item.style.justifyContent = "center";
      });
      setTimeout(() => {
        EasyEatsText.style.display = "none";
      }, 100);
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
            <Link
              to="/easy-eats"
              className={`li-text ${
                activeLink === "/easy-eats" ? "active" : ""
              }`}
              title="Easy Eats"
            >
              <div className="li-block">
                <img src={Logo} className="li-block-img" />
                <div className="li-block-text">Easy Eats</div>
              </div>
            </Link>
            <Link
              to="/easy-eats/users"
              className={`li-text ${
                activeLink === "/easy-eats/users" ? "active" : ""
              }`}
              title="Users"
            >
              <div className="li-block">
                <img src={Users} className="li-block-img" />
                <div className="li-block-text">Users</div>
              </div>
            </Link>
            <Link
              to="/easy-eats/catigories"
              className={`li-text ${
                activeLink === "/easy-eats/catigories" ? "active" : ""
              }`}
              title="Catigories"
            >
              <div className="li-block">
                <img src={Categories} className="li-block-img" />
                <div className="li-block-text">Catigories</div>
              </div>
            </Link>
            <Link
              to="/easy-eats/foods"
              className={`li-text ${
                activeLink === "/easy-eats/foods" ? "active" : ""
              }`}
              title="Foods"
            >
              <div className="li-block">
                <img src={Meals} className="li-block-img" />
                <div className="li-block-text">Foods</div>
              </div>
            </Link>
          </ul>
        </div>
      </div>

      <div className="section-body">
        <div className="easy-header">
          <div className="easy-header-left">
            <div
              className="easy-aside-gych"
              id="gych-block"
              onClick={() => Gych()}
            >
              <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <div className="easy-headr-body-text">
              <div className="easy-headr-text-subtitle">
                <img src={Usersgr} alt="" />
              </div>
              <div className="easy-headr-text-title"> {Name}</div>
            </div>
          </div>

          <div className="easy-headr-body">
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
      </div>
    </main>
  );
};

export default EasyEats;
