export const FolderBar = ({ folders, onFolderClick, currentPage, totalPages, onPageChange, username }) => {
  return (
    <div>
      <h2>Available folders</h2>
      <div className="folder-bar">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`folder-item ${folder.ownerUsername !== username ? "owner" : ""}`}
            onClick={() => onFolderClick(folder.id)}
          >
            {folder.ownerUsername !== username ? `${folder.ownerUsername}/${folder.name}` : folder.name}
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