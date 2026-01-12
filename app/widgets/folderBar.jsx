export const FolderBar = ({ folders, onFolderClick, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="folder-pagination-wrapper">
      <div className="folder-bar">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="folder-item"
            onClick={() => onFolderClick(folder.id)}
          >
            {folder.name}
          </div>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};