import React from 'react';
import '../../styles/product/css/Pagination.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const maxButtons = 5;
  const lastGroupFirstPage = Math.ceil(currentPage / maxButtons) * maxButtons + 1;
  const firstGroupFirstPage = Math.max(lastGroupFirstPage - maxButtons, 1);

  const renderPageButtons = () => {
    const pageButtons = [];
    const endPage = Math.min(lastGroupFirstPage - 1, totalPages);

    for (let i = firstGroupFirstPage; i <= endPage; i++) {
      pageButtons.push(
        <span
          key={i}
          className={`page-number ${i === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </span>
      );
    }
    return pageButtons;
  };

  const handlePrevGroupClick = () => {
    onPageChange(firstGroupFirstPage - 1); // 이전 그룹 버튼 클릭 시 첫 페이지로 이동
  };

  const handleNextGroupClick = () => {
    onPageChange(lastGroupFirstPage); // 다음 그룹 버튼 클릭 시 다음 그룹의 첫 페이지로 이동
  };

  return (
    <div className="pagination-container">
      {firstGroupFirstPage > 1 && (
        <button className="prev" onClick={handlePrevGroupClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
      {renderPageButtons()}
      {lastGroupFirstPage <= totalPages && (
        <button className="next" onClick={handleNextGroupClick}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
}

export default Pagination;
