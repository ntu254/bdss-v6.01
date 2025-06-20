import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex gap-2">
      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${p === page ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          {p}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
