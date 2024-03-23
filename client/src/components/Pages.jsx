import React from 'react';

const Pages = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav>
      <ul className="pagination justify-content-between">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button onClick={() => onPageChange(currentPage - 1)} className="page-link">
            Previous
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button onClick={() => onPageChange(currentPage + 1)} className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pages;
