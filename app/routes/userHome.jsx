import { validateSession, fetchFolders } from "../http/apiClient";
import { useNavigate } from "react-router";
import { FOLDERS_PAGE_SIZE, DEFAULT_PAGE } from "../config/apiConfig";
import "../styles/userHome.css";
import { useEffect, useState } from "react";

const UserHome = () => {
  console.log("UserHome rendered");

  const [folders, setFolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleDirectoryClick = (id) => {
    console.log(`Clicked directory with ID: ${id}`);
    // Add logic to handle directory click, e.g., navigate or fetch data
  };

  const updateData = (data) => {
    setFolders(data["items"]);
    setCurrentPage(data["page"])
    setTotalPages(data["totalPages"])
    console.log(data)
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        // Validate session first
        await validateSession(navigate);

        // If session is valid, fetch folders
        const data = await fetchFolders(DEFAULT_PAGE, FOLDERS_PAGE_SIZE)
        if (!Object.keys(data).length === 0) {
          updateData(data)
        }

      } catch (error) {
        console.error('Error during initialization:', error);
      }
    };

    initialize();
  }, [navigate]);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the User Home Page</h1>
    </div>
  );
};

export default UserHome;