import { validateSession, fetchFolders, createFolder } from "../http/apiClient";
import { useNavigate } from "react-router";
import { FOLDERS_PAGE_SIZE, DEFAULT_PAGE } from "../config/apiConfig";
import "../styles/userHome.css";
import { useEffect, useState } from "react";

const FolderBar = ({ folders, onFolderClick }) => {
  return (
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
  );
};

const UserHome = () => {
  console.log("UserHome rendered");

  const [folders, setFolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [folderName, setFolderName] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Przechowywanie wiadomości sukcesu
  const [errorMessage, setErrorMessage] = useState(''); // Przechowywanie wiadomości błędu
  const navigate = useNavigate();

  const handleDirectoryClick = (id) => {
    console.log(`Clicked directory with ID: ${id}`);
    // Add logic to handle directory click, e.g., navigate or fetch data
  };

  const updateData = (data) => {
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
        await validateSession(navigate);

        // If session is valid, fetch folders
        const data = await fetchFolders(DEFAULT_PAGE, FOLDERS_PAGE_SIZE)
        if (Object.keys(data).length !== 0) {
          updateData(data)
        }

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
    } catch (error) {
      console.error('Error creating folder:', error);
      setErrorMessage('Failed to create folder. Please try again.');
    }
  };

  return (
    <div className="user-home">
      <h1>Welcome to User Home</h1>

      <FolderBar folders={folders} onFolderClick={handleDirectoryClick} />

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
    </div>
  );
};

export default UserHome;