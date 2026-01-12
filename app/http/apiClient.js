import {
    API_BASEPATH,
    LOGIN_PATH,
    REGISTER_PATH,
    FOLDERS_PATH,
    SESSION_VALIDATE_PATH,
    SESSION_REFRESH_PATH,
    SESSION_LOGOUT_PATH,
    FILE_UPLOAD_PATH,
    FILES_PATH,
    PERMISSIONS_PATH,
    FILE_DOWNLOAD_PATH
} from "../config/apiConfig"

// REAL
export const handleLogin = async (username, password, navigate, setErrorMessage) => {
  try {
    const response = await fetch(API_BASEPATH + LOGIN_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/userHome");
    } else {
      setErrorMessage("Login unsuccessful. Please try again.");
    }
  } catch (error) {
    navigate("/oops")
  }
};

// mock
// export const handleLogin = async (username, password, navigate, setErrorMessage) => {
//   console.log(JSON.stringify({ username, password }))
//     if (false) {
//       navigate('/home');
//     } else {
//       setErrorMessage('Login unsuccessful. Please try again.');
//     }
// };

// REAL
export const handleRegister = async (username, password, setErrorMessage, setSuccessMessage, navigate) => {
  try {
    const response = await fetch(API_BASEPATH + REGISTER_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setSuccessMessage('Registration successful! You can now log in.'); // Set success message
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || 'Registration failed. Please try again.'); // Set error message from response
    }
  } catch (error) {
    console.error('Error during registration:', error);
    navigate('/oops');
  }
};

// // mock
// export const handleRegister = async (username, password, setErrorMessage, setSuccessMessage, navigate) => {
//   console.log(JSON.stringify({ username, password }));

//   setSuccessMessage("Registration successful! You can now log in.");
// };

export const fetchFolders = async (pageNum, pageSize) => {
  try {
    const response = await fetch(API_BASEPATH + FOLDERS_PATH + '?' + new URLSearchParams({
      page: pageNum,
      pageSize: pageSize
    }).toString());

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch catalogs:', response.status, response.statusText);
      return {}; // Return an empty object if the response is not OK
    }
  } catch (error) {
    console.error('Error during fetchCatalogs:', error);
    return {}; // Return an empty object in case of an error
  }
};

export const fetchFolderFiles = async (folder_id, pageNum, pageSize) => {
  try{
    const response = await fetch(API_BASEPATH + FOLDERS_PATH + '/' + folder_id + FILES_PATH + "?" 
      + new URLSearchParams({
      page: pageNum,
      pageSize: pageSize
    }).toString());

    if (response.ok){
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch catalogs:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error during fetchCatalogs:', error);
  }
  return {};
};

export const fetchFolderPermissions = async (folder_id) => {
  try{
    const response = await fetch(API_BASEPATH + FOLDERS_PATH + "/" + folder_id + PERMISSIONS_PATH)
    if (response.ok){
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch catalogs:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error during fetchCatalogs:', error);
  }
  return {};
}

export const createFolder = async (name, setErrorMessage, setSuccessMessage) => {
  try {
    const response = await fetch(API_BASEPATH + FOLDERS_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      setSuccessMessage('Catalog Created Successfully'); // Set success message
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || 'Failed to create folder'); // Set error message from response
    }
  } catch (error) {
    setErrorMessage('Failed to create folder.');
    console.error('Error during folder creation:', error);
  }
}


export const validateSession = async (navigate, setUsername) => {
  console.log("trying to validate session")
  try {
    const validateResponse = await fetch(API_BASEPATH + SESSION_VALIDATE_PATH);

    if (validateResponse.status === 200) {
      const data = await validateResponse.json();
      setUsername(data["username"]);
      return;
    }
    
    if (validateResponse.status === 401) {
      const data = await validateResponse.json();
      console.log(data);
      if (data.error === "Session expired") {
        console.log("expired token")
        await _tryRefreshSession(navigate);
        return;
      }
    }
  } catch (validateError) {
    console.error('Error during session validation:', validateError);
  }
  navigate('/oops');
};

const _tryRefreshSession = async (navigate) => {
  console.log("trying to refresh token");
  try{
    const refreshResponse = await fetch(API_BASEPATH + SESSION_REFRESH_PATH);

    if (refreshResponse.ok) {
      console.log("token refresh successfull");
      return;
    }
  } catch (refreshError) {
    console.error('Error during session refresh:', refreshError);
  }
  navigate('/oops');
}


export const logoutUser = async (navigate) => {
  try{
    const logoutResponse = await fetch(API_BASEPATH + SESSION_LOGOUT_PATH);

    if (logoutResponse.ok) {
      navigate(LOGIN_PATH);
    }
  } catch (error) {
    console.error('Error during session logout: ', error);
  }
}


export const uploadFile = async (formData) => {
  try {
    const response = await fetch(API_BASEPATH + FILE_UPLOAD_PATH, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during file upload:", error);
  }
};

export const downloadFile = async (file_id) => {
  try {
    const response = await fetch(API_BASEPATH + FILE_DOWNLOAD_PATH + file_id);
    if (!response.ok) {
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers.get("Content-Disposition");
    const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
    const filename = filenameMatch ? filenameMatch[1] : "downloaded-file";

    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error during file upload:", error);
  }
}

export const deleteFile = async (file_id) => {
  const response = await fetch(API_BASEPATH + FILE_DOWNLOAD_PATH + file_id, {
    method: "DELETE"
  });

  try{
    const response = await fetch(API_BASEPATH + FILE_DOWNLOAD_PATH + file_id);
    if (!response.ok){
      console.log("file delete failed");
    }
  } catch (error) {
    console.error("Error during file upload:", error);
  }
}