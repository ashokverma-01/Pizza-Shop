import React from "react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-end items-center gap-2 mt-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md font-medium 
        ${currentPage === 1 ? "btn btn-primary ms-3" : "btn btn-primary ms-3"}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = currentPage === index + 1;

        return (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-10 h-10 rounded-md font-medium border transition duration-200 
            ${
              isActive
                ? "btn btn-danger text-white border-blue-600 ms-3"
                : "btn btn-success text-white border-blue-600 ms-3"
            }`}
          >
            {index + 1}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md font-medium 
        ${
          currentPage === totalPages
            ? "btn btn-primary ms-3"
            : "btn btn-primary ms-3"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
