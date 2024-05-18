import React, { useEffect, useState } from "react";
import "../style/User.css";

import Update from "../icons/update.png";
import Delete from "../icons/delete.png";

export default function Users() {
  // to filter
  const [firtsNames, setFirstnames] = useState("");
  const [lastNames, setLastnames] = useState("");
  const [userNames, setUsernames] = useState("");
  const [apiUpdate, setApiupdate] = useState(false);
  const [API, setAPI] = useState("");
  // to beckend
  const [firtsName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [triggerBackend, setTriggerBackend] = useState(true);

  useEffect(() => {
    if (triggerBackend) {
      backendFrom();
      setTriggerBackend(false);
    }
  }, [page, size, triggerBackend]);

  function backendFrom() {
    const data = {
      firstName: firtsName,
      lastName: lastName,
      username: userName,
      page: 0,
      size: 10,
    };

    fetch("http://easy-eats.uz:8081/user/list", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        getTableexperes(data.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getTableexperes(data) {
    const Tbody = document.getElementById("table-tbody");

    Tbody.innerHTML = "";
    let a = page + 1;
    data.forEach((element) => {
      let tr = document.createElement("tr");

      let tdId = document.createElement("td");
      tdId.innerHTML = a;
      a++;
      tr.appendChild(tdId);

      let tdUsername = document.createElement("td");
      tdUsername.innerHTML = element.firstName;
      tr.appendChild(tdUsername);

      let tdFirstname = document.createElement("td");
      tdFirstname.innerHTML = element.lastName;
      tr.appendChild(tdFirstname);

      let tdLastname = document.createElement("td");
      tdLastname.innerHTML = element.username;
      tr.appendChild(tdLastname);

      let tdRole = document.createElement("td");
      tdRole.innerHTML = element.role;
      tr.appendChild(tdRole);

      let tdCreated = document.createElement("td");
      tdCreated.innerHTML = element.registeredAt;
      tr.appendChild(tdCreated);

      let tdBtn = document.createElement("td");
      let block = document.createElement("div");

      block.className = "table-tbody-btn-body";

      let Updates = document.createElement("button");
      let Deletes = document.createElement("button");

      Updates.className = "table-tbody-update";
      Deletes.className = "table-tbody-delete";

      Updates.title = "Edit";
      Deletes.title = "Delete";

      Updates.addEventListener("click", () => {
        setFirstname(element.firstName);
        setLastname(element.lastName);
        setUsername(element.username);
        setPassword("");
        setRole(element.role);
        setApiupdate(true);
        openModalUpdates(element.id);
      });

      Deletes.addEventListener("click", () => {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
          // O'chirishni amalga oshirish uchun kerakli kodlar
          alert("Deleted successfully");
        } else {
          // O'chirishni bekor qilish
          alert("Deletion canceled");
        }
      });

      let imgUpdate = document.createElement("img");
      let imgDelete = document.createElement("img");

      imgUpdate.className = "table-tbody-imgUpdate";
      imgDelete.className = "table-tbody-imgDelete";

      imgUpdate.src = Update;
      imgUpdate.alt = "Edit";
      imgDelete.src = Delete;
      imgDelete.alt = "Delete";
      Updates.appendChild(imgUpdate);
      Deletes.appendChild(imgDelete);

      block.appendChild(Updates);
      block.appendChild(Deletes);

      tdBtn.appendChild(block);
      tr.appendChild(tdBtn);

      Tbody.appendChild(tr);
    });
  }

  function getAccessToken() {
    return localStorage.getItem("jwtToken");
  }

  function serachClick() {
    backendFrom();
  }

  function clearClick() {
    setFirstname("");
    setLastname("");
    setUsername("");
    setTriggerBackend(true);
  }

  // ADD USER modal ###############################
  function openModalAdduser() {
    document.querySelector(".modal-overlay").style.display = "flex";
    setAPI("/auth/register");
  }

  function openModalUpdates(id) {
    document.querySelector(".modal-overlay").style.display = "flex";
    setAPI(`/user/update/${id}`);
  }

  function closeModalAdduser() {
    document.querySelector(".modal-overlay").style.display = "none";
    setFirstname("");
    setLastname("");
    setUsername("");
    setPassword("");
    setRole("");
    setApiupdate(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: firtsName,
      lastName: lastName,
      username: userName,
      password: password,
      role: role,
    };
    if (apiUpdate) {
      fetch(`http://easy-eats.uz:8081${API}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("updates", data);
          closeModalAdduser();
          // window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(`http://easy-eats.uz:8081${API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("addUser", data);
          closeModalAdduser();
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="user">
      <div className="user-body">
        <div className="user-inputs">
          <div className="user-inputs-body">
            <div className="user-inputs-items">
              <input
                type="text"
                name="firstnames"
                id="firstnames"
                value={firtsNames}
                placeholder="Firstname"
                className="user-inputs-items-input"
                onChange={(e) => setFirstnames(e.target.value)}
              />
              <input
                type="text"
                name="lastnames"
                id="lastnames"
                value={lastNames}
                placeholder="Lastname"
                className="user-inputs-items-input"
                onChange={(e) => setLastnames(e.target.value)}
              />
              <input
                type="text"
                name="usernames"
                id="usernames"
                value={userNames}
                placeholder="Username"
                className="user-inputs-items-input"
                onChange={(e) => setUsernames(e.target.value)}
              />
            </div>

            <div className="user-inputs-btns">
              <button
                className="btn-search cursor"
                onClick={() => serachClick()}
              >
                Search
              </button>
              <button className="btn-clear cursor" onClick={() => clearClick()}>
                Clear
              </button>
            </div>
          </div>

          <>
            <button
              id="openModalBtn"
              className="btn-add cursor"
              onClick={() => openModalAdduser()}
            >
              Add User
            </button>

            <div className="modal-overlay">
              <div className="modal">
                <button className="close-btn" onClick={closeModalAdduser}>
                  X
                </button>
                <h2>Add User</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstname">Firstname:</label>
                    <input
                      type="text"
                      id="firstname"
                      value={firtsName}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Lastname:</label>
                    <input
                      type="text"
                      id="lastname"
                      value={lastName}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      value={userName}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <input
                      type="text"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </>
        </div>

        <div className="user-table">
          <table className="user-table-body">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>id</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>username</th>
                <th>role</th>
                <th>Created at</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="table-tbody"></tbody>
          </table>
        </div>

        <div></div>
      </div>
    </div>
  );
}
