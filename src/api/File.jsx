import { createContext, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import axios from "axios";
export const FileContext = createContext();
const File = ({ children }) => {
  const { loader, setLoader, alert, setAlert, errorMessage, seterrorMessage } =
    useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [paswordModalVisible, setPasswordModalVisible] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [downloadImage, setDownloadImage] = useState(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const getFiles = async (directory) => {
    try {
      setLoader(true);
      setFiles([]);
      if (directory) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/files/${directory}`
        );
        if (response && response.data.status === "success") {
          setLoader(false);
          setFiles(response.data.files);
          seterrorMessage(null);
        } else {
          setFiles([]);
          setLoader(false);
          seterrorMessage(response.data.message);
        }
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const uploadFile = async (data, type) => {
    console.log(data);
    try {
      setLoader(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            console.log(progressEvent.progress * 100);
          },
        }
      );
      if (response && response.data.status === "success") {
        await getFiles(type)
          .then(() => {
            setLoader(false);
            setAlert({
              status: response.data.status,
              message: response.data.message,
            });
            setTimeout(() => setAlert(null), 3000);
          })
          .catch((error) => {
            setLoader(false);
            setAlert({
              status: "danger",
              message: error.message,
            });
            setTimeout(() => setAlert(null), 3000);
          });
      } else {
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
  };

  const getTotalFiles = async (directory) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/totalfiles/${directory}`
      );
      if (response && response.data.status === "success") {
        return response.data.files;
      } else {
        setAlert({
          status: "danger",
          message: response.data.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const getTotalDiectories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/totaldirectories`
      );
      if (response && response.data.status === "success") {
        return response.data.directories;
      } else {
        setAlert({
          status: "danger",
          message: response.data.message,
        });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const deleteFile = async (directory, id) => {
    if (directory && id) {
      try {
        setLoader(true);
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/delete/${directory}/${id}`
        );
        if (response && response.data.status === "success") {
          await getFiles(directory)
            .then(() => {
              setLoader(false);
              setAlert({
                status: response.data.status,
                message: response.data.message,
              });
              setTimeout(() => setAlert(null), 3000);
            })
            .catch((error) => {
              setLoader(false);
              setAlert({
                status: "danger",
                message: error.message,
              });
              setTimeout(() => setAlert(null), 3000);
            });
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
    }
  };

  const downloadFile = async (filename) => {
    try {
      if (filename) {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/download/${filename}`
        );
        if (response && response.data.status === "success") {
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setDownloadImage(imageUrl);
        } else {
          setAlert({
            status: "danger",
            message: response.data.message,
          });
          setTimeout(() => setAlert(null), 3000);
        }
      }
    } catch (error) {
      setAlert({
        status: "danger",
        message: error.message,
      });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  const value = {
    uploadFile,
    alert,
    loader,
    getTotalFiles,
    getTotalDiectories,
    modalVisible,
    setModalVisible,
    paswordModalVisible,
    setPasswordModalVisible,
    files,
    getFiles,
    deleteFile,
    alertModalVisible,
    setAlertModalVisible,
    errorMessage,
    downloadFile,
    downloadImage,
    toggleSidebar,
    setToggleSidebar,
  };
  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
export default File;
