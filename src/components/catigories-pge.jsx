import React, { useEffect, useState } from "react";
import "../style/categories.css";
import { APIS } from "../API/api";
import Success from "./Success";
import { useNavigate } from "react-router-dom";

import Search from "../icons/users/Search.png";
import Clear from "../icons/users/Close.png";
import AddUser from "../icons/users/Add.png";
import { Categories_base } from "../Base/base";
import Pagination from "./Pagination";

import UpdateIcon from "../icons/category/restart.png";
import DeleteIcon from "../icons/category/Delete.png";
import ViewIcon from "../icons/category/Eye.png";

import Close from "../icons/category/Close.png";

export default function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModal, setisUpdateModal] = useState(false);

  const [ImgId, setImgId] = useState(0);
  const [formData, setFormData] = useState({
    categoriesImg: 0,
    categoriesTitle: "",
  });

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(Categories_base.length);

  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState(true);

  const [isDisabled, setIsDisabled] = useState(true);

  const [triggerBackend, setTriggerBackend] = useState(true);

  const [updateId, setUpdateid] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setFormData((prevState) => ({
      ...prevState,
      categoriesImg: "",
      categoriesTitle: "",
    }));
  };

  const closeModal = () => {
    setIsModalOpen(false);

    if (formData.categoriesImg) {
      fetch(`${APIS}attach/remove/${ImgId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Xatolik:", error); // Xatolikni konsolga chiqarish
        });
    }
    setImgId(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoriesImg") {
      const fileInput = e.target.files[0]; // Rasm faylini olish
      const formData = new FormData();
      formData.append("file", fileInput); // Rasm faylini FormData ga qo'shish

      fetch(`${APIS}attach/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData, // FormData obyektini POST so'roviga qo'shish
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setImgId(data.data.id);
          setIsDisabled(false);
        })
        .catch((error) => {
          console.error("Xatolik:", error); // Xatolikni konsolga chiqarish
        });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function getAccessToken() {
    return localStorage.getItem("jwtToken");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: formData.categoriesTitle,
      imageId: ImgId,
    };
    console.log(data);
    fetch(`${APIS}category/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (triggerBackend) {
      // StartBack();
      const startIndex = page * size;
      const paginatedData = Categories_base.slice(
        startIndex,
        startIndex + size
      );
      setTotalPages(Math.ceil(Categories_base.length / size));
      setTriggerBackend(false);
      myCategoriesBlock(paginatedData);
    }
  }, [size, page, triggerBackend]);

  // function StartBack() {
  //   const data = {
  //     name: name,
  //     page: page,
  //     size: size,
  //   };

  //   fetch(`${APIS}category/list`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${getAccessToken()}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       myCategoriesBlock(data);
  //       setSizeList(6);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  function myCategoriesBlock(data) {
    console.log(data);
    const BlockBody = document.querySelector(".categories-body-block");
    BlockBody.innerHTML = "";

    data.forEach((element) => {
      const Block = document.createElement("div"),
        BlockImg = document.createElement("img"),
        BlockImgBody = document.createElement("div"),
        BlockTitle = document.createElement("div"),
        BlockText = document.createElement("div"),
        BlockBtnsBody = document.createElement("div"),
        BlockBtnsBodyItemsRight = document.createElement("div"),
        BlockBtnsBodyItemsLeft = document.createElement("div"),
        BlockViewBtn = document.createElement("button"),
        BlockEditBtn = document.createElement("button"),
        BlockDeleteBtn = document.createElement("button"),
        BlockPngBtnUpdate = document.createElement("img"),
        BlockPngBtnDelete = document.createElement("img"),
        BlockPngBtnView = document.createElement("img");

      Block.className = "CatBlock"; // Adding class to main block
      BlockPngBtnUpdate.src = UpdateIcon;
      BlockPngBtnDelete.src = DeleteIcon;
      BlockPngBtnView.src = ViewIcon;

      BlockPngBtnUpdate.className = "CatBlockBtnItemsIcon";
      BlockPngBtnDelete.className = "CatBlockBtnItemsIcon";
      BlockPngBtnView.className = "CatBlockBtnItemsIcon";

      BlockImg.src = element.imageUrl;
      BlockImg.className = "CatBlockImg";

      BlockImgBody.className = "CatBlockImgBody";

      BlockTitle.textContent = element.name;
      BlockTitle.className = "CatBlockTitle";

      BlockBtnsBody.className = "BlockBtnsBody";
      BlockBtnsBodyItemsRight.className = "BlockBtnsBodyItemsRight";
      BlockBtnsBodyItemsLeft.className = "BlockBtnsBodyItemsLeft";

      BlockViewBtn.className = "CatBlockBtnItems";
      BlockEditBtn.className = "CatBlockBtnItems";
      BlockDeleteBtn.className = "CatBlockBtnItems";

      BlockViewBtn.appendChild(BlockPngBtnView);
      BlockEditBtn.appendChild(BlockPngBtnUpdate);
      BlockDeleteBtn.appendChild(BlockPngBtnDelete);

      BlockBtnsBodyItemsRight.appendChild(BlockViewBtn);
      BlockBtnsBodyItemsLeft.appendChild(BlockEditBtn);
      BlockBtnsBodyItemsLeft.appendChild(BlockDeleteBtn);

      BlockBtnsBody.appendChild(BlockBtnsBodyItemsLeft);
      BlockBtnsBody.appendChild(BlockBtnsBodyItemsRight);

      BlockViewBtn.addEventListener("click", () => {
        navigate("/easy-eats/foods", {
          state: { categoryId: element.id },
        });
      });

      BlockEditBtn.addEventListener("click", () => {
        openUpdateModal(true);
        setFormData((prevFormData) => ({
          ...prevFormData,
          categoriesTitle: element.name,
        }));
        setUpdateid(element.id);
      });

      BlockDeleteBtn.addEventListener("click", () => {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
          fetch(`${APIS}category/delete/${element.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setShowSuccess(true);
              setText(data.message);
              setColor(data.success);
              if (data.success) {
                setTimeout(() => {
                  setShowSuccess(false);
                  window.location.reload();
                }, 3000);
              }
            })
            .catch((error) => {
              setShowSuccess(true);
              setText(error.message);
              setColor(false);
            });
        } else {
          alert("Deletion canceled");
        }
      });

      BlockImgBody.appendChild(BlockTitle);
      BlockImgBody.appendChild(BlockText);
      Block.appendChild(BlockImg);
      Block.appendChild(BlockImgBody);
      Block.appendChild(BlockBtnsBody);

      BlockBody.appendChild(Block);
    });
  }

  const renderSuccessMessage = () => {
    if (showSuccess) {
      return <Success title={text} success={color} />;
    }
    return null;
  };

  function serachClick() {
    // StartBack();
    myCategoriesBlock(Categories_base);
  }

  function clearClick() {
    setName("");
    setTriggerBackend(true);
  }

  function openUpdateModal(event) {
    setisUpdateModal(event);
  }

  function handleUpdateModal(e) {
    e.preventDefault();

    const data = {
      name: formData.categoriesTitle,
      imageId: ImgId,
    };
    console.log(data);
    fetch(`${APIS}category/update/${updateId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setisUpdateModal(false);
  }

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;

    if (name === "categoriesImg") {
      const fileInput = e.target.files[0]; // Rasm faylini olish
      const formData = new FormData();
      formData.append("file", fileInput); // Rasm faylini FormData ga qo'shish

      fetch(`${APIS}attach/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData, // FormData obyektini POST so'roviga qo'shish
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setImgId(data.data.id);
          setIsDisabled(false);
        })
        .catch((error) => {
          console.error("Xatolik:", error); // Xatolikni konsolga chiqarish
        });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handlePageChange(newPage) {
    setPage(newPage);
    setTriggerBackend(true);
  }

  return (
    <div className="categories">
      <div className="categories-body">
        <div className="categories-url">
          <div className="categories-url-body">
            <div className="user-inputs-body">
              <div className="user-inputs-items">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="Firstname"
                  className="user-inputs-items-input categories-input"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="user-inputs-btns">
                <button
                  className="btn-search cursor"
                  onClick={() => serachClick()}
                >
                  <img src={Search} alt="" />
                </button>
                <button
                  className="btn-clear cursor"
                  onClick={() => clearClick()}
                >
                  <img src={Clear} alt="" />
                </button>
              </div>
            </div>

            <button className="categories-url-add-button" onClick={openModal}>
              <div>
                <img src={AddUser} alt="" />
                <span>Add</span>
              </div>
            </button>
          </div>

          {isModalOpen && (
            <div id="myModal" className="modal" style={{ display: "block" }}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  <img src={Close} alt="" />
                </span>
                <h2>Add Categories</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label
                      className="custom-file-upload"
                      onChange={handleChange}
                      required
                    >
                      Choose image
                      <input type="file" />
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="categoriesTitle"
                      name="categoriesTitle"
                      value={formData.categoriesTitle}
                      onChange={handleChange}
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div className="modal-add-btn-body">
                    <button
                      className="modal-add-btn-cansel"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="modal-add-btn-send"
                      disabled={isDisabled}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {isUpdateModal && (
            <div id="myModal" className="modal" style={{ display: "block" }}>
              <div className="modal-content">
                <span className="close" onClick={() => setisUpdateModal(false)}>
                  <img src={Close} alt="" />
                </span>
                <h2>Update Categories</h2>
                <form onSubmit={(e) => handleUpdateModal(e)}>
                  <div className="form-group">
                    <label
                      className="custom-file-upload"
                      onChange={handleChange}
                      required
                    >
                      Choose image
                      <input type="file" />
                    </label>
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      id="categoriesTitle"
                      name="categoriesTitle"
                      value={formData.categoriesTitle}
                      onChange={handleChange}
                      placeholder="Title"
                      required
                    />
                  </div>
                  <div className="modal-add-btn-body">
                    <button
                      className="modal-add-btn-cansel"
                      onClick={() => setisUpdateModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="modal-add-btn-send"
                      disabled={isDisabled}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* {isUpdateModal && (
            <div
              id="updateModal"
              className="updateModal"
              style={{ display: "block" }}
            >
              <div className="updateModal-content">
                <span
                  className="closeUpdate"
                  onClick={() => setisUpdateModal(false)}
                >
                  &times;
                </span>
                <h2>Update Categories</h2>
                <form onSubmit={handleUpdateModal}>
                  <div className="Updateform-group">
                    <label htmlFor="categoriesImg">Image</label>
                    <input
                      type="file"
                      id="categoriesImg"
                      name="categoriesImg"
                      onChange={handleChangeUpdate}
                      className="image-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoriesTitle">Title</label>
                    <input
                      type="text"
                      id="categoriesTitle"
                      name="categoriesTitle"
                      value={formData.categoriesTitle}
                      onChange={handleChangeUpdate}
                    />
                  </div>
                  <button>Update Categories</button>
                </form>
              </div>
            </div>
          )} */}
          {renderSuccessMessage()}
        </div>

        <div className="categories-body-block"></div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
