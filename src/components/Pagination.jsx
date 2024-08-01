import React from "react";
import "../style/Pagination.css";
import prevBtn from "../icons/users/prevbtn.png";
import nextBtn from "../icons/users/nextbtn.png";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  const getPages = () => {
    const maxPagesToShow = 3;
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(0, endPage - maxPagesToShow);
    }

    return Array.from({ length: endPage - startPage }, (_, i) => startPage + i);
  };

  const pages = getPages();

  return (
    <div className="pagination">
      <button
        className="pagination-prevbtn"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <img src={prevBtn} alt="" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${
            page === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageClick(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        className="pagination-prevbtn"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >
        <img src={nextBtn} alt="" />
      </button>
    </div>
  );
}
