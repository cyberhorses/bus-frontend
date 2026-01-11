import { useState } from "react";

const DirectoryBar = ({ directories, onDirectoryClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(directories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleDirectories = directories.slice(startIndex, startIndex + itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="directory-bar">
      <div className="directories">
        {visibleDirectories.map((directory) => (
          <button
            key={directory.id}
            className="directory-item"
            onClick={() => onDirectoryClick(directory.id)}
          >
            {directory.name}
          </button>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DirectoryBar;