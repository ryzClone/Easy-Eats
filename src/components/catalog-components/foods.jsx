import React, { useEffect, useState } from "react";
import { APIS } from "../../API/api";
import Success from "../Success";
import { useLocation } from "react-router-dom";
import "./Foods.css";

import Search from "./Search.png";
import Clear from "./Close.png";
import Close from "./Close.png";
import AddUser from "./Add.png";
import { Foods_base } from "../../Base/base";
import Pagination from "../Pagination";

import UpdateIcon from "./restart.png";
import DeleteIcon from "./Delete.png";
import ViewIcon from "./Eye.png";

export default function CatFoods() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModal, setisUpdateModal] = useState(false);
  const [ImgId, setImgId] = useState("");

  const [formData, setFormData] = useState({
    foodImg: 0,
    foodName: "",
    foodDescription: "",
    foodPrice: "",
    foodCategoryId: "",
  });

  const [updateId, setUpdateid] = useState("");

  const location = useLocation();

  const [name, setName] = useState("");
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [sizeList, setSizeList] = useState(6);

  const [showSuccess, setShowSuccess] = useState(false);
  const [text, setText] = useState("");
  const [color, setColor] = useState(true);

  const [isDisabled, setIsDisabled] = useState(true);

  const [triggerBackend, setTriggerBackend] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
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
    setImgId("");
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
      // setTriggerBackend(false);
      myCategoriesBlock(Foods_base);
    }

    if (location.state) {
      setCategoryId(location.state);
    }
  }, [size, page, triggerBackend]);

  function StartBack() {
    if (minPrice === 0) {
      setminPrice("");
    }
    if (maxPrice === 0) {
      setmaxPrice("");
    }

    const data = {
      name: name,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      description: description,
      categoryId: categoryId.categoryId,
      page: page,
      size: size,
    };

    fetch(`${APIS}food/list`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        myCategoriesBlock(data);
        setSizeList(3);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function myCategoriesBlock(data) {
    const BlockBody = document.querySelector(".categories-body-block");
    console.log(data);
    BlockBody.innerHTML = "";

    data.forEach((element) => {
      const Block = document.createElement("div"),
        BlockImg = document.createElement("img"),
        BlockImgBody = document.createElement("div"),
        BlockTitle = document.createElement("div"),
        BlockText = document.createElement("div"),
        BlockPrice = document.createElement("div"),
        BlockPriceSpanLeft = document.createElement("div"),
        BlockPriceSpanRight = document.createElement("div"),
        BlockBtnsBody = document.createElement("div"),
        BlockBtnsBodyItemsRight = document.createElement("div"),
        BlockBtnsBodyItemsLeft = document.createElement("div"),
        BlockViewBtn = document.createElement("button"),
        BlockEditBtn = document.createElement("button"),
        BlockDeleteBtn = document.createElement("button"),
        BlockPngBtnUpdate = document.createElement("img"),
        BlockPngBtnDelete = document.createElement("img"),
        BlockPngBtnView = document.createElement("img");

      Block.className = "FoodBlock";

      BlockImg.src = element.image;
      BlockImg.className = "FoodBlockImg";

      BlockImgBody.className = "FoodBlockImgBody";

      BlockTitle.textContent = element.name;
      BlockTitle.className = "FoodBlockTitle";

      BlockText.textContent = element.description;
      BlockText.className = "FoodBlockText";

      BlockPriceSpanLeft.textContent = "Price:";
      BlockPriceSpanRight.textContent = element.price;
      BlockPriceSpanLeft.className = "BlockPriceSpanLeft";
      BlockPriceSpanRight.className = "BlockPriceSpanRight";

      BlockPrice.appendChild(BlockPriceSpanLeft);
      BlockPrice.appendChild(BlockPriceSpanRight);

      BlockPrice.className = "FoodBlockPrice";

      BlockBtnsBody.className = "BlockBtnsBody";
      BlockBtnsBodyItemsRight.className = "BlockBtnsBodyItemsRight";
      BlockBtnsBodyItemsLeft.className = "BlockBtnsBodyItemsLeft";

      BlockPngBtnUpdate.src = UpdateIcon;
      BlockPngBtnDelete.src = DeleteIcon;
      BlockPngBtnView.src = ViewIcon;

      BlockPngBtnUpdate.className = "FoodBlockBtnItemsIcon";
      BlockPngBtnDelete.className = "FoodBlockBtnItemsIcon";
      BlockPngBtnView.className = "FoodBlockBtnItemsIcon";

      BlockViewBtn.appendChild(BlockPngBtnView);
      BlockEditBtn.appendChild(BlockPngBtnUpdate);
      BlockDeleteBtn.appendChild(BlockPngBtnDelete);

      BlockViewBtn.className = "FoodBlockBtnItems";
      BlockEditBtn.className = "FoodBlockBtnItems";
      BlockDeleteBtn.className = "FoodBlockBtnItems";

      BlockBtnsBodyItemsRight.appendChild(BlockEditBtn);
      BlockBtnsBodyItemsRight.appendChild(BlockDeleteBtn);
      BlockBtnsBodyItemsLeft.appendChild(BlockViewBtn);

      BlockBtnsBody.appendChild(BlockBtnsBodyItemsRight);
      BlockBtnsBody.appendChild(BlockBtnsBodyItemsLeft);

      BlockViewBtn.addEventListener("click", () => {
        window.location.pathname = "/easy-eats/catigories-foods-meals";
      });

      BlockDeleteBtn.addEventListener("click", () => {
        const confirmed = window.confirm("Are you sure you want to delete?");
        if (confirmed) {
          setTimeout(() => {
            setShowSuccess(false);
            window.location.reload();
          }, 3000);

          fetch(`${APIS}category/delete/${element.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              setShowSuccess(true);
              setText(data.message);
              setColor(data.success);
            })
            .catch((error) => {
              setShowSuccess(true);
              setText(error.message);
              setColor(error.success);
            });
        } else {
          // O'chirishni bekor qilish
          alert("Deletion canceled");
        }
      });

      BlockEditBtn.addEventListener("click", () => {
        openUpdateModal(true);
        setFormData((prevFormData) => ({
          ...prevFormData,
          foodName: element.name,
          foodDescription: element.description,
          foodPrice: element.price,
          foodCategoryId: element.categoryId,
        }));
        setUpdateid(element.id);
      });

      BlockImgBody.appendChild(BlockTitle);
      BlockImgBody.appendChild(BlockText);
      BlockImgBody.appendChild(BlockPrice);

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
  }

  function clearClick() {
    setName("");
    setminPrice(0);
    setmaxPrice(0);
    setDescription("");
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
                  placeholder="Name"
                  className="user-inputs-items-input"
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  name="minPrice"
                  id="minPrice"
                  value={minPrice}
                  placeholder="minPrice"
                  className="user-inputs-items-input"
                  onChange={(e) => setminPrice(e.target.value)}
                />
                <input
                  type="number"
                  name="maxPrice"
                  id="maxPrice"
                  value={maxPrice}
                  placeholder="maxPrice"
                  className="user-inputs-items-input"
                  onChange={(e) => setmaxPrice(e.target.value)}
                />
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  placeholder="description"
                  className="user-inputs-items-input"
                  onChange={(e) => setDescription(e.target.value)}
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
                <h2>Add Food</h2>
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
                      id="foodName"
                      name="foodName"
                      value={formData.foodName}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="foodDescription"
                      name="foodDescription"
                      value={formData.foodDescription}
                      onChange={handleChange}
                      placeholder="Description"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="foodPrice"
                      name="foodPrice"
                      value={formData.foodPrice}
                      onChange={handleChange}
                      placeholder="Price"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="foodCategoryId"
                      name="foodCategoryId"
                      value={formData.foodCategoryId}
                      onChange={handleChange}
                      placeholder="CategoryId"
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
                <h2>Update Food</h2>
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
                      id="foodName"
                      name="foodName"
                      value={formData.foodName}
                      onChange={handleChange}
                      placeholder="Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="foodDescription"
                      name="foodDescription"
                      value={formData.foodDescription}
                      onChange={handleChange}
                      placeholder="Description"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="foodPrice"
                      name="foodPrice"
                      value={formData.foodPrice}
                      onChange={handleChange}
                      placeholder="Price"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="foodCategoryId"
                      name="foodCategoryId"
                      value={formData.foodCategoryId}
                      onChange={handleChange}
                      placeholder="CategoryId"
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
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {renderSuccessMessage()}
        </div>

        <div className="categories-body-block"></div>
      </div>
    </div>
  );
}
