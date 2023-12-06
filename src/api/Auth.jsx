import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const Auth = ({ children }) => {
  const [loginToken, setLoginToken] = useState(localStorage.getItem("token"));
  const [loggedInUser, setLoggedInUser] = useState({});
  const [errorMessage, seterrorMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [alert, setAlert] = useState(null);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        if (response.data.status === "success") {
          setLoggedInUser(response.data.user);
        }
      }
    } catch (error) {
      console.log("Get User", error);
    }
  };

  const authenticate = async (data) => {
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          ...data,
        }
      );
      if (response) {
        if (response.data.status === "failed") {
          seterrorMessage(response.data.message);
          setTimeout(() => seterrorMessage(null), 3000);
          setLoader(false);
        } else {
          localStorage.setItem("token", response.data.token);
          setLoginToken(response.data.token);
          await getUser();
          seterrorMessage(null);
          setLoader(false);
        }
      }
    } catch (error) {
      setLoader(false);
      seterrorMessage(`Authentication Error : ${error.message}`);
      setTimeout(() => seterrorMessage(null), 3000);
    }
  };

  const change_password = async (data) => {
    if (data.password === data.confirm_password) {
      try {
        setLoader(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/change-password`,
          {
            ...data,
          },
          {
            headers: {
              Authorization: "Bearer " + loginToken,
            },
          }
        );
        if (response.data.status === "success") {
          setLoader(false);
          setAlert({
            status: "success",
            message: response.data.message,
          });
          setTimeout(() => setAlert(null), 3000);
          await logout();
        } else {
          setLoader(false);
          setAlert({
            status: "danger",
            message: response.data.message,
          });
          setTimeout(() => setAlert(null), 3000);
        }
      } catch (error) {
        setLoader(false);
        setAlert({
          status: "danger",
          message: error.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } else {
      seterrorMessage("Passwords didn't match");
      setTimeout(() => seterrorMessage(null), 3000);
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        setLoginToken(null);
      }
    } catch (error) {
      seterrorMessage(`logout Error : ${error}`);
    }
  };

  const value = {
    authenticate,
    logout,
    errorMessage,
    seterrorMessage,
    loginToken,
    loggedInUser,
    loader,
    getUser,
    setLoader,
    change_password,
    alert,
    setAlert,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default Auth;
