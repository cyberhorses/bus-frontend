import {
    API_BASEPATH,
    LOGIN_PATH,
    REGISTER_PATH
} from "../config/apiConfig"

// REAL
// export const handleLogin = async (username, password, navigate, setErrorMessage) => {
//   try {
//     const response = await fetch(API_BASEPATH + LOGIN_PATH, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       navigate("/home");
//     } else {
//       setErrorMessage("Login unsuccessful. Please try again.");
//     }
//   } catch (error) {
//     navigate("/oops")
//   }
// };

// mock
export const handleLogin = async (username, password, navigate, setErrorMessage) => {
  console.log(JSON.stringify({ username, password }))
    if (false) {
      navigate('/home');
    } else {
      setErrorMessage('Login unsuccessful. Please try again.');
    }
};

// REAL
// export const handleRegister = async (username, password, setErrorMessage, setSuccessMessage, navigate) => {
//   try {
//     const response = await fetch(API_BASEPATH + REGISTER_PATH, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (response.ok) {
//       setSuccessMessage('Registration successful! You can now log in.'); // Set success message
//     } else {
//       const errorData = await response.json();
//       setErrorMessage(errorData.message || 'Registration failed. Please try again.'); // Set error message from response
//     }
//   } catch (error) {
//     console.error('Error during registration:', error);
//     navigate('/oops');
//   }
// };

// mock
export const handleRegister = async (username, password, setErrorMessage, setSuccessMessage, navigate) => {
  console.log(JSON.stringify({ username, password }));

  setSuccessMessage("Registration successful! You can now log in.");
};




