import { validateSession } from "../http/apiClient";
import { useNavigate } from "react-router";
import DirectoryBar from "../widgets/DirectoryBar";
import "../styles/userHome.css";
import { useEffect } from "react";

const UserHome = () => {
  console.log("UserHome rendered");
  const navigate = useNavigate();
  const directories = [
    { id: 1, name: "Directory 1" },
    { id: 2, name: "Directory 2" },
    { id: 3, name: "Directory 3" },
    { id: 4, name: "Directory 4" },
    { id: 5, name: "Directory 5" },
    { id: 6, name: "Directory 6" },
    { id: 7, name: "Directory 7" },
    { id: 8, name: "Directory 8" },
    { id: 9, name: "Directory 9" },
    { id: 10, name: "Directory 10" },
  ];

  const handleDirectoryClick = (id) => {
    console.log(`Clicked directory with ID: ${id}`);
    // Add logic to handle directory click, e.g., navigate or fetch data
  };

  useEffect(() => {
    validateSession(navigate);
  }, [navigate]);

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the User Home Page</h1>
      <DirectoryBar directories={directories} onDirectoryClick={handleDirectoryClick} />
    </div>
  );
};

export default UserHome;