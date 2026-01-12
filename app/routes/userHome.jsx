import { validateSession, fetchFolders, createFolder, logoutUser, uploadFile, fetchFolderFiles } from "../http/apiClient";
import { useNavigate } from "react-router";
import { FOLDERS_PAGE_SIZE, DEFAULT_PAGE, LOGIN_PATH, FILES_PAGE_SIZE } from "../config/apiConfig";
import "../styles/userHome.css";
import { useEffect, useState } from "react";
import { FolderBar } from "../widgets/folderBar";



const UserHome = () => {
  // folders bar
  const [folders, setFolders] = useState([]);
  const [currentFolderPage, setCurrentFolderPage] = useState(DEFAULT_PAGE);
  const [totalFolderPages, setTotalFolderPages] = useState(1);
  const [currentFolder, setCurrentFolder] = useState('')
  // files list
  const [currentFilePage, setCurrentFilePage] = useState(DEFAULT_PAGE);
  const [totalFilePages, setTotalFilePages] = useState(1);
  const files = [
    { id: "e2a12f42-8dd6-4158-b36f-d79d92870264", name: "text.txt", size: "4MB" },
    { id: "a3b45c67-9ef8-4abc-8d12-ef5678901234", name: "image.png", size: "2MB" },
    { id: "c4d56e78-1abc-4def-9a34-ef6789012345", name: "video.mp4", size: "20MB" },
  ];

  // folder creation
  const [folderName, setFolderName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 

  // user info
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleFolderClick = (id) => {
    console.log(`Clicked directory with ID: ${id}`);
    setCurrentFolder(id);
    updateFilesData(id, DEFAULT_PAGE);
    // Add logic to handle directory click, e.g., navigate or fetch data
  };

  const updateFoldersData = async (page) => {
    const data = await fetchFolders(page, FOLDERS_PAGE_SIZE)
    setFolders(data["items"]);
    setCurrentFolderPage(data["page"])
    setTotalFolderPages(data["totalPages"])
    console.log(data);
  }

  const updateFilesData = async (folderId, page) => {
    try {
      const data = await fetchFolderFiles(folderId, page, FILES_PAGE_SIZE);
      console.log(data);
      // setFiles(data["items"]);
      setCurrentFilePage(data["page"]);
      setTotalFilePages(data["totalPages"]);
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        // Validate session first
        await validateSession(navigate, setUsername);

        updateFoldersData(currentFolderPage);

      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initialize();
  }, []);

  const handleCreateFolder = async () => {
    try {
      if (folderName.trim() === '') {
        setErrorMessage('Folder name cannot be empty');
        return;
      }

      await createFolder(folderName, setErrorMessage, setSuccessMessage); // Wywołanie funkcji API do tworzenia folderu
      setFolderName(''); // Resetowanie pola nazwy folderu
      updateFoldersData(currentFolderPage);
      
    } catch (error) {
      console.error('Error creating folder:', error);
      setErrorMessage('Failed to create folder. Please try again.');
    }
  };

  const handlePageChange = async (newPage) => {
    try {
      updateFoldersData(newPage);
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
      {/* <div className="top-bar">
        <span className="username-display">Logged as: {username}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div> */}
    {username ? (
      <div className="top-bar">
        <span className="username-display">Logged as: {username}</span>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    ) : (
      <div className="top-bar">
        <span className="username-display">Loading...</span>
      </div>
    )}
      <h1>Welcome to User Home</h1>

      <div className="folder-pagination-wrapper">
        <FolderBar
          folders={folders}
          onFolderClick={handleFolderClick}
          currentPage={currentFolderPage}
          totalPages={totalFolderPages}
          onPageChange={handlePageChange}
        />
      </div>

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