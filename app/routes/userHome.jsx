import { validateSession, fetchFolders, createFolder, logoutUser, uploadFile } from "../http/apiClient";
import { useNavigate } from "react-router";
import { FOLDERS_PAGE_SIZE, DEFAULT_PAGE, LOGIN_PATH } from "../config/apiConfig";
import "../styles/userHome.css";
import { useEffect, useState } from "react";

const FolderBar = ({ folders, onFolderClick, currentPage, totalPages, onPageChange }) => {
  return (
    <div>
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

const UserHome = () => {
  const [folders, setFolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(1);
  const [folderName, setFolderName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [username, setUsername] = useState('');
  const [currentFolder, setCurrentFolder] = useState('')
  const navigate = useNavigate();

  const handleFolderClick = (id) => {
    console.log(`Clicked directory with ID: ${id}`);
    setCurrentFolder(id)
    // Add logic to handle directory click, e.g., navigate or fetch data
  };

  const updateData = async (page) => {
    const data = await fetchFolders(page, FOLDERS_PAGE_SIZE)
    setFolders(data["items"]);
    setCurrentPage(data["page"])
    setTotalPages(data["totalPages"])
    console.log(data);
    console.log(folders);
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        // Validate session first
        await validateSession(navigate, setUsername);

        updateData(currentPage);

      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initialize();
  }, [navigate]);

  const handleCreateFolder = async () => {
    try {
      if (folderName.trim() === '') {
        setErrorMessage('Folder name cannot be empty');
        return;
      }

      await createFolder(folderName, setErrorMessage, setSuccessMessage); // Wywołanie funkcji API do tworzenia folderu
      setFolderName(''); // Resetowanie pola nazwy folderu
      updateData(currentPage);
      
    } catch (error) {
      console.error('Error creating folder:', error);
      setErrorMessage('Failed to create folder. Please try again.');
    }
  };

  const handlePageChange = async (newPage) => {
    try {
      updateData(newPage);
    } catch (error) {
      console.error("Error fetching folders for new page:", error);
    }
  };

  const handleLogout = () => {
    logoutUser(navigate);
  };

  const handleFileUpload = async (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.file;
    const dirInput = event.target.elements.dir;
    const file = fileInput.files[0];
    const dir = dirInput.value;

    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("dir", dir);

      await uploadFile(formData);
      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="user-home">
      <div className="top-bar">
        <span className="username-display">Logged as: {username}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <h1>Welcome to User Home</h1>

      <FolderBar
        folders={folders}
        onFolderClick={handleFolderClick}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <div className="create-folder">
        <input
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <button onClick={handleCreateFolder}>Create</button>
      </div>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleFileUpload} className="file-upload-form">
        <input type="file" name="file" />
        <input type="hidden" name="dir" value={currentFolder} />
        <button type="submit">Upload File</button>
      </form>
    </div>
  );
};

export default UserHome;