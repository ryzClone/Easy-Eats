import React, { useEffect, useState } from "react";
import { APIS } from "../../API/api";
import Success from "../Success";

export default function CatFoods() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ImgId, setImgId] = useState("");
  const [formData, setFormData] = useState({
    categoriesImg: "",
    categoriesTitle: "",
  });
  const [name, setName] = useState("");
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
      StartBack();
      setTriggerBackend(false);
    }
  }, [size, page, triggerBackend]);

  function StartBack() {
    const data = {
      name: name,
      page: page,
      size: size,
    };

    fetch(`${APIS}category/list`, {
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
    BlockBody.innerHTML = "";

    data.data.list.forEach((element) => {
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
        BlockDeleteBtn = document.createElement("button");

      Block.className = "CatBlock";

      BlockImg.src = element.imageUrl; // Tasvir manbasini o'rnatish
      BlockImg.className = "CatBlockImg";

      BlockImgBody.className = "CatBlockImgBody"; // BlockImgBody uchun klassni o'rnatish

      BlockTitle.textContent = element.name; // Sarlavha matnini o'rnatish
      BlockTitle.className = "CatBlockTitle";

      BlockBtnsBody.className = "BlockBtnsBody";
      BlockBtnsBodyItemsRight.className = "BlockBtnsBodyItemsRight";
      BlockBtnsBodyItemsLeft.className = "BlockBtnsBodyItemsLeft";

      BlockViewBtn.className = "BlockViewBtn";
      BlockEditBtn.className = "BlockEditBtn";
      BlockDeleteBtn.className = "BlockDeleteBtn";

      BlockViewBtn.innerHTML = "View";
      BlockEditBtn.innerHTML = "Update";
      BlockDeleteBtn.innerHTML = "Delete";

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

      BlockImgBody.appendChild(BlockTitle);
      BlockImgBody.appendChild(BlockText);
      Block.appendChild(BlockImg); // Tasvirni `Block` ga qo'shish
      Block.appendChild(BlockImgBody); // BlockImgBody'ni `Block` ga qo'shish
      Block.appendChild(BlockBtnsBody);

      BlockBody.appendChild(Block); // Hamma narsani `BlockBody` ga qo'shish
    });
  }

  const renderSuccessMessage = () => {
    if (showSuccess) {
      return <Success title={text} success={color} />;
    }
    return null;
  };

  function prevPage() {
    if (page >= 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page + 1 * size <= sizeList) {
      setPage(page + 1);
    }
  }

  function serachClick() {
    StartBack();
  }

  function clearClick() {
    setName("");
    setTriggerBackend(true);
  }

  return (
    <div className="categories">
      <div className="categories-body">
        <div className="categories-url">
          <div className="categories-url-text">categories - foods</div>

          <div className="categories-url-body">
            <div className="user-inputs-body">
              <div className="user-inputs-items">
                <input
                  type="text"
                  name="firstnames"
                  id="firstnames"
                  value={name}
                  placeholder="Firstname"
                  className="user-inputs-items-input"
                  onChange={(e) => setName(e.target.value)}
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
                  onClick={() => clearClick()}
                >
                  Clear
                </button>
              </div>
            </div>

            <button className="categories-url-add-button" onClick={openModal}>
              Add
            </button>
          </div>

          {isModalOpen && (
            <div id="myModal" className="modal" style={{ display: "block" }}>
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Add Categories</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="categoriesImg">Image</label>
                    <input
                      type="file"
                      id="categoriesImg"
                      name="categoriesImg"
                      onChange={handleChange}
                      className="image-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoriesTitle">Title</label>
                    <input
                      type="text"
                      id="categoriesTitle"
                      name="categoriesTitle"
                      value={formData.categoriesTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button disabled={isDisabled}>Add Categories</button>
                </form>
              </div>
            </div>
          )}
          {renderSuccessMessage()}
        </div>

        <div className="pageNext">
          <button
            className="pagination-button prev pageNextBtn"
            onClick={prevPage}
          />
          <div className="pageList">{page + 1}</div>
          <button
            className="pagination-button next pageNextBtn"
            onClick={nextPage}
          />
        </div>

        <div className="categories-body-block"></div>
      </div>
    </div>
  );
}
