import React, { useEffect, useState } from "react";
import "../style/User.css";

import Update from "../icons/update.png";
import Delete from "../icons/delete.png";

export default function Users() {
  // to Backend ma'lumotlar
  const [firtsName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [userName, setUsername] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  useEffect(() => {
    backendFrom();
  }, []);

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

    // <tr>
    //   <td>1</td>
    //   <td>ozodbek</td>
    //   <td>jumayev</td>
    //   <td>franco</td>
    //   <td>admin</td>
    //   <td>21.03.2021</td>
    //   <td>edit delete</td>
    // </tr>;
  }

  function getAccessToken() {
    return localStorage.getItem("jwtToken");
  }

  function serachClick() {
    backendFrom();
  }
  function updateClick() {
    setFirstname("", () => {
      backendFrom();
    });
    setLastname("", () => {
      backendFrom();
    });
    setUsername("", () => {
      backendFrom();
    });
  }

  return (
    <div className="user">
      <div className="user-body">
        <div className="user-inputs">
          <div className="user-inputs-body">
            <div className="user-inputs-items">
              <input
                type="text"
                name=""
                id=""
                value={firtsName}
                placeholder="Firstname"
                className="user-inputs-items-input"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                type="text"
                name=""
                id=""
                value={lastName}
                placeholder="Lastname"
                className="user-inputs-items-input"
                onChange={(e) => setLastname(e.target.value)}
              />
              <input
                type="text"
                name=""
                id=""
                value={userName}
                placeholder="Username"
                className="user-inputs-items-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="user-inputs-btns">
              <button
                className="btn-search cursor"
                onClick={() => serachClick()}
              >
                Search
              </button>
              <button
                className="btn-clear cursor"
                onClick={() => updateClick()}
              >
                Clear
              </button>
            </div>
          </div>

          <button className="btn-add cursor">Add User</button>
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
